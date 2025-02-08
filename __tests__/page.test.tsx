import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/(auth)/login/page';



describe('SignIn Page', () => {
    it('should have login button', () => {
        render(<Page />);
        expect(
            screen.getByRole('button', { name: /Login with Nspire Insights/i })
        ).toBeDefined();
    });
});
