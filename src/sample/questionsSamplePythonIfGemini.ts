const questionsSamplePythonIfGemini = {
  content: [
    {
      id: 1,
      question:
        "Which of the following is the correct syntax for an 'if' statement in python?",
      code: null,
      options: ['if (condition):', 'if condition:', 'if condition ='],
      correctAnswer: 'if condition:',
    },
    {
      id: 2,
      question: "What is the purpose of the 'elif' statement?",
      code: null,
      options: [
        "To provide an alternative condition to the 'if' statement",
        "To execute code if the 'if' statement is false",
        "To end the 'if' statement block",
      ],
      correctAnswer: "To provide an alternative condition to the 'if' statement",
    },
    {
      id: 3,
      question: "What is the difference between 'if' and 'if else' statements?",
      code: null,
      options: [
        "'if' statements only execute code if the condition is true, while 'if else' statements execute code regardless of the condition",
        "'if' statements can have multiple conditions, while 'if else' statements can only have one condition",
        "'if else' statements are more efficient than 'if' statements",
      ],
      correctAnswer:
        "'if' statements only execute code if the condition is true, while 'if else' statements execute code regardless of the condition",
    },
    {
      id: 4,
      question: "What is the purpose of the 'pass' statement in an 'if' block?",
      code: null,
      options: [
        "To prevent the 'if' block from executing any code",
        'To execute code if the condition is false',
        "To end the 'if' statement block",
      ],
      correctAnswer: "To prevent the 'if' block from executing any code",
    },
    {
      id: 5,
      question: 'Which of the following conditions is evaluated as true in python?',
      code: null,
      options: ['0', 'None', 'False'],
      correctAnswer: 'False',
    },
    {
      id: 6,
      question: "What is the purpose of the 'and' and 'or' operators in 'if' statements?",
      code: null,
      options: [
        'To combine multiple conditions into a single expression',
        'To execute code if all or any of the conditions are true',
        "To end the 'if' statement block",
      ],
      correctAnswer: 'To combine multiple conditions into a single expression',
    },
    {
      id: 7,
      question:
        "Which of the following is the correct syntax for a nested 'if' statement in python?",
      code: null,
      options: [
        'if condition1: if condition2:',
        'if condition1\nif condition2:',
        'if condition1 if condition2:',
      ],
      correctAnswer: 'if condition1:\nif condition2:',
    },
    {
      id: 8,
      question: "What is the purpose of the 'break' statement in an 'if' block?",
      code: null,
      options: [
        "To end the 'if' statement block and continue execution after the block",
        'To execute code if the condition is false',
        "To prevent the 'if' block from executing any code",
      ],
      correctAnswer:
        "To end the 'if' statement block and continue execution after the block",
    },
    {
      id: 9,
      question:
        'Which of the following is the correct syntax for a conditional expression in python?',
      code: null,
      options: [
        'condition ? true_value : false_value',
        'condition : true_value ? false_value',
        'true_value ? condition : false_value',
      ],
      correctAnswer: 'condition ? true_value : false_value',
    },
    {
      id: 10,
      question: "What is the purpose of the 'in' operator in 'if' statements?",
      code: null,
      options: [
        'To check if a value is contained in a sequence',
        'To combine multiple conditions into a single expression',
        "To end the 'if' statement block",
      ],
      correctAnswer: 'To check if a value is contained in a sequence',
    },
  ],
}

export default questionsSamplePythonIfGemini
