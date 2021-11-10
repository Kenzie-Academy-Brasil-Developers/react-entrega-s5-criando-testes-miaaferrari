import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from "../App";
import Providers from '../providers/index';
import userEvent from "@testing-library/user-event";
import api from '../services/index';
import MockAdapter from 'axios-mock-adapter';

const apiMock = new MockAdapter(api);

describe("When the user enters a valid cep", () => {
    test("should show the address on inputs", async () => {
        apiMock.onGet('90690300').replyOnce(200, {
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
        })
       
        render(
            <Providers>
                <App />
            </Providers>
        );

        userEvent.type(screen.getByPlaceholderText("Insira o CEP"), "90690300");
        userEvent.click(screen.getByRole("button"));

        const response = await screen.findAllByRole("textbox");

        expect(response).toHaveLength(6)
    });
});

describe("When the user enters a invalid cep", () => {
       test("should not show the address on inputs", async () => {
        apiMock.onGet('00690000').replyOnce(200, {})
       
        render(
            <Providers>
                <App />
            </Providers>
        );

        userEvent.type(screen.getByPlaceholderText("Insira o CEP"), "00690000");
        userEvent.click(screen.getByRole("button"));

        const response = screen.queryByPlaceholderText("Apartamento, bloco, ...");

        await waitFor(() => {
            expect(response).not.toBeInTheDocument();
        })
    });
});