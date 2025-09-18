export const questions = [
  {
    id: 1,
    title: 'React Component Lifecycle',
    type: 'Multiple Choice',
    difficulty: 'Easy',
    content: `Which React hook is equivalent to componentDidMount in class components?

The componentDidMount lifecycle method in class components is called after the component is mounted to the DOM. In functional components with hooks, we need to find the equivalent hook that provides the same functionality.`,
    options: [
      'useEffect with an empty dependency array []',
      'useEffect without any dependency array',
      'useState with initial value',
      'useCallback with empty dependencies'
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    title: 'State Management Hook',
    type: 'Coding Challenge',
    difficulty: 'Medium',
    content: `Create a custom hook called 'useCounter' that:

1. Takes an initial value as parameter (default to 0)
2. Returns an object with:
   - current count value
   - increment function (increases by 1)
   - decrement function (decreases by 1)
   - reset function (resets to initial value)

Example usage:
const { count, increment, decrement, reset } = useCounter(5);`
  },
  {
    id: 3,
    title: 'JSX and Props',
    type: 'Multiple Choice',
    difficulty: 'Easy',
    content: `What is the correct way to pass a boolean prop to a React component?

When passing boolean values as props in React, there are different syntaxes that can be used. Choose the most appropriate and commonly used approach.`,
    options: [
      '<Component isActive={true} />',
      '<Component isActive />',
      '<Component isActive="true" />',
      'Both A and B are correct'
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    title: 'React Context Implementation',
    type: 'Coding Challenge',
    difficulty: 'Hard',
    content: `Create a Theme Context that manages light/dark theme state:

1. Create a ThemeContext using React.createContext
2. Create a ThemeProvider component that:
   - Manages theme state (light/dark)
   - Provides a toggleTheme function
   - Wraps children with the context provider
3. Create a useTheme hook that consumes the context

The context should provide: { theme, toggleTheme }
Where theme is either 'light' or 'dark'`
  },
  {
    id: 5,
    title: 'Event Handling',
    type: 'Multiple Choice',
    difficulty: 'Medium',
    content: `What will happen when you click the button in this code?

\`\`\`jsx
function App() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
\`\`\``,
    options: [
      'Count will increase by 3',
      'Count will increase by 1',
      'Count will increase by 2',
      'Code will throw an error'
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    title: 'Conditional Rendering Component',
    type: 'Coding Challenge',
    difficulty: 'Medium',
    content: `Create a LoadingButton component that:

1. Accepts props: { children, isLoading, onClick, disabled }
2. When isLoading is true:
   - Shows a spinner/loading text instead of children
   - Is automatically disabled
3. When not loading:
   - Shows the children content
   - Respects the disabled prop
4. Always calls onClick when clicked (if not disabled)

Use modern React patterns.`
  },
  {
    id: 7,
    title: 'React Performance',
    type: 'Multiple Choice',
    difficulty: 'Hard',
    content: `Which of the following techniques is most effective for preventing unnecessary re-renders in React?

Consider a scenario where you have a parent component that re-renders frequently, but its child component only needs to update when specific props change.`,
    options: [
      'Using useCallback for all functions',
      'Wrapping the child component with React.memo',
      'Using useMemo for all computed values',
      'Moving state to a separate component'
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    title: 'Custom Form Hook',
    type: 'Coding Challenge',
    difficulty: 'Hard',
    content: `Create a useForm hook that handles form state and validation:

1. Takes an initial values object and validation rules
2. Returns:
   - values: current form values
   - errors: validation errors object
   - handleChange: function to update field values
   - handleSubmit: function that validates and calls onSubmit if valid
   - isValid: boolean indicating if form is valid

Example usage:
const { values, errors, handleChange, handleSubmit, isValid } = useForm(
  { email: '', password: '' },
  { email: (value) => !value.includes('@') ? 'Invalid email' : null }
);`
  }
];
