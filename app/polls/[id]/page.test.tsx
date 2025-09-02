import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PollPage from './page';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('PollPage', () => {
  const mockProps = {
    params: { id: '123' },
  };

  // Unit Test 1: Renders poll question and options
  it('should render the poll question and all options correctly', () => {
    render(<PollPage {...mockProps} />);
    
    // Check if the question is displayed
    expect(screen.getByText('What is your favorite programming language?')).toBeInTheDocument();

    // Check if all options are rendered
    expect(screen.getByLabelText('JavaScript')).toBeInTheDocument();
    expect(screen.getByLabelText('Python')).toBeInTheDocument();
    expect(screen.getByLabelText('TypeScript')).toBeInTheDocument();
    expect(screen.getByLabelText('Rust')).toBeInTheDocument();
  });

  // Unit Test 2: Submit button is disabled initially
  it('should have the submit button disabled before an option is selected', () => {
    render(<PollPage {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    expect(submitButton).toBeDisabled();
  });

  // Integration Test: User votes and sees a thank you message
  it('should allow a user to select an option, vote, and see a thank you message', async () => {
    render(<PollPage {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /submit vote/i });
    const pythonOption = screen.getByLabelText('Python');

    // Button is initially disabled
    expect(submitButton).toBeDisabled();

    // User selects an option
    fireEvent.click(pythonOption);

    // Button is now enabled
    expect(submitButton).not.toBeDisabled();

    // User clicks the submit button
    fireEvent.click(submitButton);

    // Show loading state
    expect(screen.getByText('Voting...')).toBeInTheDocument();

    // After a delay (simulated vote), the thank you message appears
    await waitFor(() => {
      expect(screen.getByText('Thank you for voting!')).toBeInTheDocument();
    });

    // The form should no longer be on the page
    expect(screen.queryByRole('button', { name: /submit vote/i })).not.toBeInTheDocument();
  });
});
