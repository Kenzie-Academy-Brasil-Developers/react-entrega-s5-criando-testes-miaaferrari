import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from "semantic-ui-react";


describe("Button Component", (() => {
    test("should be able to render a button", (() => {
        render (
            <Button primary onClick={() => {}} />
        );
        expect(screen.getByRole("button")).toBeTruthy(); 
    }));
}));