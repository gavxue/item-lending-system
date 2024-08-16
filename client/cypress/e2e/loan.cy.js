describe('Testing app', () => {
    it('loans item', () => {
        cy.visit('/')
        cy.contains('Loan an item').click()
        cy.get('#name').type('Gavin Xue')
        cy.get('#email').type('g3xue@uwaterloo.ca')
        cy.get('#item').type('Automated cyress test')
        cy.get('.btn').click()
        cy.contains('email sent', { timeout: 60000 })
    })

    it('sends reminder', () => {
        cy.visit('/admin')
        cy.contains('Send').click()
        cy.contains('email sent', { timeout: 60000 })
    })

    it('returns item', () => {
        cy.visit('/')
        cy.contains('Return an item').click()
        cy.get('.btn:first').click()
        cy.contains('email sent', { timeout: 60000 })
    })
})