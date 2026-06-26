import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  // Clean (dev only) — order respects FKs via cascade from the top.
  await db.workspace.deleteMany()
  await db.user.deleteMany()

  const passwordHash = await bcrypt.hash('password', 10)
  const palette = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626']
  const names = ['Ahmed Yusuf', 'Sarah Evans', 'Marcus Johnson', 'Priya Sharma', 'James Chen']
  const users = await Promise.all(
    names.map((name, i) =>
      db.user.create({
        data: {
          name,
          email: `${name.split(' ')[0]!.toLowerCase()}@gov.uk`,
          passwordHash,
          role: i === 0 ? 'admin' : 'contributor',
          avatarColor: palette[i],
        },
      })
    )
  )
  const [ahmed, sarah, marcus, priya] = users

  const workspace = await db.workspace.create({
    data: {
      name: 'Cabinet Delivery Unit',
      identifier: 'cabinet-delivery-unit',
      organization: 'Government of the United Kingdom',
      country: 'gb',
      timezone: 'Europe/London',
      memberships: { create: users.map((u) => ({ userId: u.id, role: u.role })) },
    },
  })

  const portfolio = await db.portfolio.create({
    data: {
      workspaceId: workspace.id,
      name: 'Healthcare Transformation',
      description: 'Improving health outcomes and system resilience across the national healthcare estate.',
      owner: 'Dr. Amara Okonkwo',
      reportingPeriod: 'Q2 2026 · Apr–Jun',
      health: 'at-risk',
      budgetHealth: 'healthy',
      riskLevel: 'critical',
    },
  })

  const priorityArea = await db.priorityArea.create({
    data: {
      portfolioId: portfolio.id,
      name: 'Hospital Estate Renewal',
      mission: 'Modernise the national hospital estate to expand capacity and improve patient safety by 2028.',
      owner: 'Ahmed Yusuf',
      health: 'at-risk',
      budgetHealth: 'at-risk',
      targetStatus: 'at-risk',
      targets: {
        create: [
          { name: 'Additional bed capacity', current: 580, target: 1000, unit: 'beds', trend: 'up', status: 'at-risk', forecast: '870 by Q4', confidence: 'Medium' },
          { name: 'Theatre utilisation', current: 82, target: 90, unit: '%', trend: 'up', status: 'healthy', forecast: '91% by Q3', confidence: 'High' },
        ],
      },
    },
  })

  // A couple more priority areas so the portfolio table is real.
  await db.priorityArea.createMany({
    data: [
      { portfolioId: portfolio.id, name: 'Digital Health Records', owner: 'Sarah Evans', health: 'at-risk', budgetHealth: 'healthy', targetStatus: 'at-risk' },
      { portfolioId: portfolio.id, name: 'Workforce & Training', owner: 'Marcus Johnson', health: 'healthy', budgetHealth: 'healthy', targetStatus: 'healthy' },
    ],
  })

  const project = await db.project.create({
    data: {
      priorityAreaId: priorityArea.id,
      name: 'Ward 4 Reconstruction',
      description: 'Full reconstruction of Ward 4 to deliver 120 additional beds and modern theatre capacity by Q2 2027.',
      owner: 'Sarah Evans',
      health: 'at-risk',
      budgetHealth: 'critical',
      deliveryConfidence: 'at-risk',
      decisions: {
        create: [
          { decision: 'Accelerate structural works programme', owner: 'Sarah Evans', date: '24 Jun', status: 'approved', statusLabel: 'Approved', linkedIntervention: 'Structural Works', outcome: '6-week recovery plan agreed', type: 'Operational', evidenceCount: 2 },
          { decision: 'Approve £3.1M contingency drawdown', owner: 'Ahmed Yusuf', date: '22 Jun', status: 'approved', statusLabel: 'Approved', linkedIntervention: 'Structural Works', outcome: 'Funded from portfolio reserve', type: 'Financial', evidenceCount: 3 },
        ],
      },
      risks: {
        create: [
          { title: 'Construction delay on Ward 4', severity: 'critical', owner: 'Ahmed Yusuf', impact: 'High', likelihood: 'High', mitigation: 'Accelerated works programme', status: 'active', nextReview: '28 Jun' },
          { title: 'Budget overrun across estate', severity: 'critical', owner: 'Sarah Evans', impact: 'High', likelihood: 'Medium', mitigation: 'Reforecast and contingency review', status: 'active', nextReview: '30 Jun' },
        ],
      },
    },
  })

  const intervention = await db.intervention.create({
    data: {
      projectId: project.id,
      name: 'Structural Works',
      objective: 'Complete the Ward 4 structural frame and foundations to enable M&E and fit-out by Q4.',
      owner: 'Ahmed Yusuf',
      status: 'blocked',
      health: 'critical',
      budgetHealth: 'at-risk',
      dueDate: '30 Sep 2026',
      milestones: {
        create: [
          { name: 'Foundations complete', owner: 'Marcus Johnson', due: '15 Jul', status: 'at-risk', groupLabel: 'Delayed', dependency: 'Steel delivery' },
          { name: 'Frame topped out', owner: 'Marcus Johnson', due: '30 Aug', status: 'planned', groupLabel: 'Upcoming' },
          { name: 'Site mobilisation', owner: 'Ahmed Yusuf', due: '12 Apr', status: 'complete', groupLabel: 'Completed' },
        ],
      },
    },
  })

  const activities = [
    { name: 'Confirm steel delivery schedule', owner: 'Ahmed Yusuf', status: 'blocked', priority: 'critical', dueLabel: 'Overdue · 2d', overdue: true, progress: 20 },
    { name: 'Pour foundation slab — Zone A', owner: 'Marcus Johnson', status: 'active', priority: 'high', dueLabel: 'Today', progress: 65 },
    { name: 'Erect frame — Grid 1–4', owner: 'Marcus Johnson', status: 'active', priority: 'high', dueLabel: 'In 3 days', progress: 40 },
    { name: 'Structural engineer sign-off', owner: 'Priya Sharma', status: 'planned', priority: 'medium', dueLabel: 'In 6 days', progress: 0 },
    { name: 'Site survey — Zone B', owner: 'James Chen', status: 'complete', priority: 'low', dueLabel: 'Done', progress: 100 },
  ]
  await db.activity.createMany({
    data: activities.map((a) => ({ ...a, interventionId: intervention.id })),
  })

  await db.notification.createMany({
    data: [
      { userId: ahmed!.id, type: 'approval', actor: 'Sarah Evans', action: 'requested your approval on', target: 'Pilot Launch milestone', context: 'Digital Identity', read: false },
      { userId: ahmed!.id, type: 'mention', actor: 'Priya Sharma', action: 'mentioned you in', target: 'Risk Escalation', context: 'Net Zero Buildings', read: false },
      { userId: ahmed!.id, type: 'assignment', actor: 'Marcus Johnson', action: 'assigned you', target: 'Draft delivery report', context: 'Hospital Upgrade', read: false },
    ],
  })

  console.log(`Seeded: ${users.length} users, workspace "${workspace.name}", portfolio, 3 priority areas, project, intervention, ${activities.length} activities.`)
  console.log('Login: ahmed@gov.uk / password')
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
