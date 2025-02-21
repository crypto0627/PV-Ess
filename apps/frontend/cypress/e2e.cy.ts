describe('Register Page Tests', () => {
  const myEmail = `jake0627a1@gmail.com`

  it('should successfully register a new user', () => {
    cy.visit('/register', {
      onLoad: (contentWindow) => {
        // This will ensure the page has fully loaded before continuing
        expect(contentWindow.document.readyState).to.equal('complete')
      }
    })
    // Fill in the registration form
    cy.get('#username').type('jakekuo')
    cy.get('#email').type(myEmail)
    cy.get('#password').type('Testuser001')
    cy.get('#confirmPassword').type('Testuser001')
    cy.get('#agreeTerms').check()

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Ensure the success message appears
    cy.get('.swal2-success').should('exist')

    // Verify that the user is redirected to the login page
    cy.url().should('include', '/login')
  })

  it('should show an error if passwords do not match', () => {
    // Fill in the form with mismatched passwords
    cy.get('#username').type('jakeuo')
    cy.get('#email').type(myEmail)
    cy.get('#password').type('password123')
    cy.get('#confirmPassword').type('password456')
    cy.get('#agreeTerms').check()

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Verify the warning message about password mismatch
    cy.get('.swal2-warning').should('exist')
    cy.get('.swal2-html-container').should('contain', 'Passwords do not match')
  })

  it('should require all fields before submission', () => {
    // Try to submit the form with missing fields
    cy.get('button[type="submit"]').click()

    // Check if the username field validation works
    cy.get('#username').then(($el) => {
      expect(($el[0] as HTMLInputElement).validationMessage).to.not.be.empty
    })
    // Check if the password field validation works
    cy.get('#password').then(($el) => {
      expect(($el[0] as HTMLInputElement).validationMessage).to.not.be.empty
    })
  })

  it('should not submit if terms are not agreed to', () => {
    // Fill in the form but don't check the terms
    cy.get('#username').type('jakekuo')
    cy.get('#email').type(myEmail)
    cy.get('#password').type('Testuser001')
    cy.get('#confirmPassword').type('Testuser001')

    // Try submitting the form
    cy.get('button[type="submit"]').click()

    // Verify the form is not submitted because terms are not checked
    cy.get('#agreeTerms').should('not.be.checked')
    cy.get('form').should('exist') // Ensure the form still exists and was not submitted
  })

  it('should display a loading state while registering', () => {
    // Fill the form and submit
    cy.get('#username').type('jakekuo')
    cy.get('#email').type(myEmail)
    cy.get('#password').type('Testuser001')
    cy.get('#confirmPassword').type('Testuser001')
    cy.get('#agreeTerms').check()

    // Ensure the submit button is disabled during loading
    cy.get('button[type="submit"]').click()
    cy.get('button[type="submit"]').should(
      'have.class',
      'opacity-50 cursor-not-allowed'
    )

    // Wait for the loading state to end
    cy.get('.swal2-success').should('exist') // Success message appears after submission
  })

  it('should display an error message if the API fails', () => {
    // Simulate a failure scenario (e.g., server returns an error)
    cy.intercept('POST', '/api/register', {
      statusCode: 500,
      body: { message: 'Internal Server Error' }
    })

    cy.get('#username').type('jakekuo')
    cy.get('#email').type(myEmail)
    cy.get('#password').type('Testuser001')
    cy.get('#confirmPassword').type('Testuser001')
    cy.get('#agreeTerms').check()

    // Submit the form and verify error message
    cy.get('button[type="submit"]').click()
    cy.get('.swal2-error').should('exist')
    cy.get('.swal2-html-container').should('contain', 'Internal Server Error')
  })
})
