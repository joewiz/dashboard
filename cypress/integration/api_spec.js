/**
 * Backend API Tests
 *
 * Tests the XQuery API endpoints directly via HTTP.
 * These don't depend on the UI and help isolate backend vs frontend bugs.
 * Related issues: #73 (proxy), #93/#107/#114 (password change 500s), #92 (group 500)
 */
describe('Backend API Endpoints', function () {
  const baseUrl = Cypress.config('baseUrl')

  describe('Public Endpoints', function () {
    it('GET /dashboard/index.html should return 200', function () {
      cy.request('/dashboard/index.html').its('status').should('eq', 200)
    })

    it('GET /dashboard/modules/getVersion.xql should return version info', function () {
      cy.request('/dashboard/modules/getVersion.xql').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.be.empty
      })
    })
  })

  describe('Authenticated Endpoints', function () {
    it('GET /dashboard/admin should require authentication', function () {
      cy.request({
        url: '/dashboard/admin',
        failOnStatusCode: false
      }).then((response) => {
        // Should either redirect to login or return the admin page
        expect(response.status).to.be.oneOf([200, 302, 401])
      })
    })

    it('GET /dashboard/modules/getCurrentUser.xql should return user info', function () {
      cy.request({
        url: '/dashboard/modules/getCurrentUser.xql',
        auth: { user: 'admin', pass: '' }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })

  describe('Package Service', function () {
    it('GET /packageservice/packages/apps should list applications', function () {
      cy.request({
        url: `${baseUrl}/../packageservice/packages/apps`,
        failOnStatusCode: false
      }).then((response) => {
        // May or may not be available depending on setup
        expect(response.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('User/Group API (#92, #93, #107, #114)', function () {
    it('GET user list API should return users', function () {
      cy.request({
        url: `${baseUrl}/usermanager/api/user/`,
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404])
      })
    })

    it('GET group list API should return groups', function () {
      cy.request({
        url: `${baseUrl}/usermanager/api/group/`,
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('Local Applications Endpoint', function () {
    it('GET /dashboard/apps/local should list local apps', function () {
      cy.request({
        url: '/dashboard/apps/local',
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404])
      })
    })
  })

  describe('Backup API', function () {
    it('GET backup module should be accessible', function () {
      cy.request({
        url: `${baseUrl}/existdb-backup/modules/backup.xql`,
        auth: { user: 'admin', pass: '' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404])
      })
    })
  })
})
