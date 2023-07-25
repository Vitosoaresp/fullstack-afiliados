import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import App from '../App';
import { FAKE_EMAIL, FAKE_PASSWORD, FAKE_RESPONSE_LOGIN } from './mokcs/user';
import { renderWithRouter } from './renderWithRouter';

const mock = new MockAdapter(axios);

describe('Testando a página de login', () => {
	afterEach(() => vi.clearAllMocks());

	it('Deve ser redirecionado para "/login" ao entrar na rota "/"', async () => {
		renderWithRouter(<App />, { route: '/' });
		waitFor(() =>
			expect(
				screen.findByRole('heading', {
					level: 2,
					name: /Faça seu login/i,
				}),
			).toBeInTheDocument(),
		);
	});

	it('Deve ser possivel interagir com o formulario de login', async () => {
		const { findByLabelText } = renderWithRouter(<App />, { route: '/' });
		const emailInput = findByLabelText('e-mail');
		const passwordInput = findByLabelText('senha');

		waitFor(async () => {
			userEvent.type(await emailInput, FAKE_EMAIL);
			userEvent.type(await passwordInput, FAKE_PASSWORD);
		});

		waitFor(() => {
			expect(emailInput).toBeInTheDocument();
			expect(passwordInput).toBeInTheDocument();
			expect(emailInput).toHaveValue(FAKE_EMAIL);
			expect(passwordInput).toHaveValue(FAKE_PASSWORD);
		});
	});

	it('Deve ser possivel fazer login', async () => {
		const { findByLabelText, findByRole } = renderWithRouter(<App />, {
			route: '/',
		});
		mock.onPost('/login').reply(200, FAKE_RESPONSE_LOGIN);
		const emailInput = findByLabelText('e-mail');
		const passwordInput = findByLabelText('senha');
		const submitButton = findByRole('button', { name: /entrar/i });

		waitFor(async () => {
			userEvent.type(await emailInput, FAKE_EMAIL);
			userEvent.type(await passwordInput, FAKE_PASSWORD);
			userEvent.click(await submitButton);
		});

		waitFor(async () => {
			expect(emailInput).not.toBeInTheDocument();
			expect(passwordInput).not.toBeInTheDocument();
			expect(submitButton).not.toBeInTheDocument();
		});
	});
});
