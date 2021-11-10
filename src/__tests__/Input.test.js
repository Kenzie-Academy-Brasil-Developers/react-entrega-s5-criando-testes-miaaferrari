import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from "semantic-ui-react";

describe("Input Component", (() => {
    test("should be able to render an input", (() => {
        render (
            <Input type="number" placeholder="Insira o CEP" onChange={() => {}} />
        );
        expect(screen.getByPlaceholderText("Insira o CEP")).toBeTruthy(); 
    }));
}));