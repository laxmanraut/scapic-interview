module.exports = [
    { 
        question: 'Which of the following statements should be used to obtain a remainder after dividing 3.14 by 2.1 ?', 
        answers:[
                    {srno:1,answer: 'rem = 3.14 % 2.1;',correct:'N'},
                    {srno:2,answer: 'rem = modf(3.14, 2.1);',correct:'N'},
                    {srno:3,answer: 'rem = fmod(3.14, 2.1);',correct:'Y'},
                    {srno:4,answer: 'Remainder cannot be obtain in floating point division.',correct:'N'}
                ]
    },
    { 
        question: 'What are the types of linkages?', 
        answers:[
            {srno:1,answer: 'Internal and External',correct:'N'},
            {srno:2,answer: 'External, Internal and None',correct:'Y'},
            {srno:3,answer: 'External and None',correct:'N'},
            {srno:4,answer: 'Internal',correct:'N'}
                ]
    },
    { 
        question: 'Which of the following special symbol allowed in a variable name?', 
        answers:[
            {srno:1,answer: '* (asterisk)',correct:'N'},
            {srno:2,answer: '| (pipeline)',correct:'N'},
            {srno:3,answer: '- (hyphen)',correct:'N'},
            {srno:4,answer: '_ (underscore)',correct:'Y'}
                ]
    },
    { 
        question: 'How would you round off a value from 1.66 to 2.0??', 
        answers:[
            {srno:1,answer: 'ceil(1.66)',correct:'Y'},
            {srno:2,answer: 'floor(1.66)',correct:'N'},
            {srno:3,answer: 'roundup(1.66)',correct:'N'},
            {srno:4,answer: 'roundto(1.66)',correct:'N'}
                ]
    },
    { 
        question: 'By default a real number is treated as a', 
        answers:[
            {srno:1,answer: 'float',correct:'N'},
            {srno:2,answer: 'double',correct:'Y'},
            {srno:3,answer: 'long double',correct:'N'},
            {srno:4,answer: 'far double',correct:'N'}
                ]
    },
    { 
        question: 'When we mention the prototype of a function?', 
        answers:[
            {srno:1,answer: 'Defining',correct:'Y'},
            {srno:2,answer: 'Declaring',correct:'N'},
            {srno:3,answer: 'Prototyping',correct:'N'},
            {srno:4,answer: 'Calling',correct:'N'}
                ]
    },
    { 
        question: 'The keyword used to transfer control from a function back to the calling function is', 
        answers:[
            {srno:1,answer: 'switch',correct:'N'},
            {srno:2,answer: 'goto',correct:'N'},
            {srno:3,answer: 'go back',correct:'N'},
            {srno:4,answer: 'return',correct:'Y'}
                ]
    },
    { 
        question: 'Out of fgets() and gets() which function is safe to use?', 
        answers:[
            {srno:1,answer: 'gets()',correct:'N'},
            {srno:2,answer: 'fgets()',correct:'Y'}
                ]
    },
    { 
        question: 'Which of the following correctly shows the hierarchy of arithmetic operations in C?', 
        answers:[
            {srno:1,answer: '/ + * -',correct:'N'},
            {srno:2,answer: '* - / +',correct:'N'},
            {srno:3,answer: '+ - / *',correct:'N'},
            {srno:4,answer: '/ * + -',correct:'Y'}
                ]
    },
    { 
        question: 'Which of the following is the correct usage of conditional operators used in C?', 
        answers:[
            {srno:1,answer: 'a>b ? c=30 : c=40;',correct:'N'},
            {srno:2,answer: 'a>b ? c=30;',correct:'N'},
            {srno:3,answer: 'max = a>b ? a>c?a:c:b>c?b:c',correct:'Y'},
            {srno:4,answer: 'return (a>b)?(a:b)',correct:'N'}
                ]
    },
    
  ];