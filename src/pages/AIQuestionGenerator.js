import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const subjects = [
  'Mathematics', 'English Language', 'Integrated Science',
  'Social Studies', 'ICT', 'Physics', 'Chemistry',
  'Biology', 'Economics'
];

const AIQuestionGenerator = () => {
  const { token }       = useAuth();
  const [subject,       setSubject]       = useState('Mathematics');
  const [topic,         setTopic]         = useState('');
  const [level,         setLevel]         = useState('JHS');
  const [count,         setCount]         = useState(5);
  const [difficulty,    setDifficulty]    = useState('medium');
  const [examType,      setExamType]      = useState('BECE');
  const [questions,     setQuestions]     = useState([]);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');
  const [copied,        setCopied]        = useState(false);

  const generateQuestions = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }
    setLoading(true);
    setError('');
    setQuestions([]);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: [{
            role:    'user',
            content: `Generate exactly ${count} multiple choice questions for ${examType} (Ghana) on the topic "${topic}" in ${subject} for ${level} students.

Difficulty: ${difficulty}

Return ONLY a valid JSON array with this exact format (no other text, no markdown):
[
  {
    "questionText": "Question here?",
    "optionA": "Option A",
    "optionB": "Option B",
    "optionC": "Option C",
    "optionD": "Option D",
    "correctAnswer": "A",
    "explanation": "Brief explanation of why this is correct"
  }
]

Make sure questions are:
- Relevant to Ghana Education Service curriculum
- Appropriate for ${level} ${examType} level
- ${difficulty} difficulty
- Clear and unambiguous`
          }]
        })
      });

      const data = await res.json();

      if (data.success) {
        try {
          const text    = data.message;
          const jsonStr = text.substring(
            text.indexOf('['),
            text.lastIndexOf(']') + 1
          );
          const parsed = JSON.parse(jsonStr);
          setQuestions(parsed);
        } catch (e) {
          setError('Failed to parse questions. Please try again.');
        }
      } else {
        setError(data.message || 'Failed to generate questions');
      }
    } catch (e) {
      setError('Connection error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    const text = questions.map((q, i) =>
      `Q${i+1}: ${q.questionText}\nA) ${q.optionA}\nB) ${q.optionB}\nC) ${q.optionC}\nD) ${q.optionD}\nAnswer: ${q.correctAnswer}\nExplanation: ${q.explanation}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🤖 AI Question Generator</h1>
          <p style={styles.subtitle}>
            Generate exam questions automatically using Claude AI
          </p>
        </div>

        {/* Generator Form */}
        <div style={styles.formCard}>
          <div style={styles.formGrid}>
            <Field label="Subject *">
              <select style={styles.input} value={subject}
                onChange={e => setSubject(e.target.value)}>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label="Topic *">
              <input style={styles.input} value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Algebraic expressions, Photosynthesis..." />
            </Field>

            <Field label="Level">
              <select style={styles.input} value={level}
                onChange={e => {
                  setLevel(e.target.value);
                  setExamType(e.target.value === 'JHS' ? 'BECE' : 'WASSCE');
                }}>
                <option value="JHS">JHS (BECE)</option>
                <option value="SHS">SHS (WASSCE)</option>
              </select>
            </Field>

            <Field label="Difficulty">
              <select style={styles.input} value={difficulty}
                onChange={e => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Field>

            <Field label="Number of Questions">
              <select style={styles.input} value={count}
                onChange={e => setCount(e.target.value)}>
                <option value="3">3 questions</option>
                <option value="5">5 questions</option>
                <option value="10">10 questions</option>
                <option value="15">15 questions</option>
                <option value="20">20 questions</option>
              </select>
            </Field>
          </div>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}

          <button
            style={{ ...styles.generateBtn, opacity: loading ? 0.7 : 1 }}
            onClick={generateQuestions}
            disabled={loading}
          >
            {loading ? '⏳ Generating questions...' : '🤖 Generate Questions with AI'}
          </button>
        </div>

        {/* Generated Questions */}
        {questions.length > 0 && (
          <div style={styles.questionsSection}>
            <div style={styles.questionsHeader}>
              <h2 style={styles.questionsTitle}>
                ✅ Generated {questions.length} Questions
              </h2>
              <button style={styles.copyBtn} onClick={copyAll}>
                {copied ? '✅ Copied!' : '📋 Copy All'}
              </button>
            </div>

            {questions.map((q, i) => (
              <div key={i} style={styles.questionCard}>
                <div style={styles.questionHeader}>
                  <span style={styles.questionNum}>Question {i + 1}</span>
                  <span style={styles.subjectTag}>{subject}</span>
                </div>

                <p style={styles.questionText}>{q.questionText}</p>

                <div style={styles.optionsGrid}>
                  {['A', 'B', 'C', 'D'].map(letter => {
                    const optKey    = `option${letter}`;
                    const isCorrect = letter === q.correctAnswer;
                    return (
                      <div
                        key={letter}
                        style={{
                          ...styles.option,
                          background: isCorrect ? '#EAFAF1' : '#f8f9fa',
                          border:     isCorrect ? '2px solid #27AE60' : '1px solid #eee',
                        }}
                      >
                        <span style={{
                          ...styles.optionLetter,
                          background: isCorrect ? '#27AE60' : '#e0e0e0',
                          color:      isCorrect ? '#fff' : '#555',
                        }}>
                          {letter}
                        </span>
                        <span style={{ fontSize: 14, color: isCorrect ? '#27AE60' : '#333' }}>
                          {q[optKey]}
                        </span>
                        {isCorrect && <span style={styles.correctMark}>✓ Correct</span>}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div style={styles.explanationBox}>
                    <span style={styles.explanationIcon}>💡</span>
                    <p style={styles.explanationText}>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 13, fontWeight: 'bold', color: '#555' }}>{label}</label>
    {children}
  </div>
);

const styles = {
  layout:           { display: 'flex', minHeight: '100vh', background: '#f0f4f8' },
  main:             { marginLeft: 240, flex: 1, padding: '28px 24px' },
  header:           { marginBottom: 24 },
  title:            { fontSize: 26, color: '#1A5276', fontWeight: 'bold', margin: 0 },
  subtitle:         { fontSize: 14, color: '#888', marginTop: 4 },
  formCard:         { background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  formGrid:         { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 },
  input:            { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, width: '100%' },
  errorBox:         { background: '#FDEDEC', border: '1px solid #E74C3C', borderRadius: 8, padding: 12, marginBottom: 16, color: '#E74C3C', fontSize: 14 },
  generateBtn:      { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #1A5276, #2E86AB)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 'bold', cursor: 'pointer' },
  questionsSection: { display: 'flex', flexDirection: 'column', gap: 16 },
  questionsHeader:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  questionsTitle:   { fontSize: 20, fontWeight: 'bold', color: '#1A5276', margin: 0 },
  copyBtn:          { background: '#EAF4FB', border: 'none', borderRadius: 8, padding: '10px 18px', color: '#2E86AB', fontSize: 14, fontWeight: 'bold', cursor: 'pointer' },
  questionCard:     { background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  questionHeader:   { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  questionNum:      { fontSize: 13, fontWeight: 'bold', color: '#2E86AB', background: '#EAF4FB', padding: '4px 10px', borderRadius: 6 },
  subjectTag:       { fontSize: 12, color: '#888' },
  questionText:     { fontSize: 16, fontWeight: 'bold', color: '#1A5276', margin: '0 0 14px', lineHeight: 1.5 },
  optionsGrid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 },
  option:           { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8 },
  optionLetter:     { width: 26, height: 26, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold', flexShrink: 0 },
  correctMark:      { fontSize: 12, color: '#27AE60', fontWeight: 'bold', marginLeft: 'auto' },
  explanationBox:   { display: 'flex', gap: 10, background: '#FEF9E7', borderRadius: 8, padding: '10px 14px', alignItems: 'flex-start' },
  explanationIcon:  { fontSize: 16, flexShrink: 0 },
  explanationText:  { fontSize: 13, color: '#7D6608', margin: 0, lineHeight: 1.5 },
};

export default AIQuestionGenerator;