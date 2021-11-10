context("CEP Flow", () => {
    it("Enters a valid CEP number and gets an address", () => {
        cy.visit('http://localhost:3000')
        cy.viewport(1440, 900)
      
      cy.intercept("GET", "90690300", {
          "bairro": "Jardim Botânico",
          "cidade": "Porto Alegre",
          "logradouro": "Rua Valparaíso",
          "estado_info": {
              "area_km2": "281.737,947",
              "codigo_ibge": "43",
              "nome": "Rio Grande do Sul"
            },
            "cep": "90690300",
        "cidade_info": {
            "area_km2": "496,682",
            "codigo_ibge": "4314902"
        },
        "estado": "RS"
    });
    
        cy.get("input[name=search]").type(90690300);
        cy.get("button[type=button]").click();
  
      cy.get("input").should(($inputs) => { 
          expect($inputs).to.have.length(7)
       })
       .eq(1).and("have.value", "Rua Valparaíso")
    })
  })