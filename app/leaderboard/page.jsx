'use client'

import React, { useState, useEffect } from 'react'

// Real data from CSV and ground truth
const datasets = {
  'aime-2025': {
    name: "AIME 2025", 
    description: "Advanced mathematical reasoning",
    fullDescription: `
      <h4>Dataset Introduction</h4>
      <p>AIME 2025 tests mathematical problem-solving capabilities through challenging competition-level problems. This benchmark evaluates models on complex mathematical reasoning, proof construction, and multi-step problem solving.</p>
      
      <h4>Sample Question</h4>
      <p><strong>Category:</strong> Mathematical Competition</p>
      <p><strong>Input:</strong> Advanced mathematical problems requiring multi-step reasoning and proof techniques.</p>
      
      <h4>Methodology</h4>
      <p>Problems sourced from mathematical competitions and validated by expert mathematicians.</p>
    `,
    sample: {
      input: "Let $f(x) = x^3 - 3x^2 + 2x - 1$. Find all values of $a$ such that the equation $f(x) = a$ has exactly one real solution.",
      output: "To find when $f(x) = a$ has exactly one real solution, analyze critical points: $f'(x) = 3x^2 - 6x + 2 = 0$. Critical points at $x = 1 ± \\frac{\\sqrt{3}}{3}$. Local maximum at $f(1 - \\frac{\\sqrt{3}}{3}) = \\frac{2\\sqrt{3}}{9} - 1$ and local minimum at $f(1 + \\frac{\\sqrt{3}}{3}) = -\\frac{2\\sqrt{3}}{9} - 1$. Therefore $a > \\frac{2\\sqrt{3}}{9} - 1$ or $a < -\\frac{2\\sqrt{3}}{9} - 1$."
    },
          benchmarkData: {
        groundTruth: {
          'GPT-4o': 0.121,
          'Claude Sonnet 3.7': 0.527,
          'Gemini 2.5 Flash': 0.298
        },
        frameworks: {
          'GPT-4o': {
          'Arize': { accuracy: 0.3, latency: 1.087 },
          'DeepEval': { accuracy: 0.1, latency: 3.424 },
          'MLflow': { accuracy: 0.1, latency: 2.845 },
          'RAGAS': { accuracy: 0.1111, latency: 4.417 }
        },
        'Claude Sonnet 3.7': {
          'Arize': { accuracy: 0.5, latency: 1.257 },
          'DeepEval': { accuracy: 0.55, latency: 3.125 },
          'MLflow': { accuracy: 0.5, latency: 2.624 },
          'RAGAS': { accuracy: 0.4444, latency: 4.113 }
        },
        'Gemini 2.5 Flash': {
          'Arize': { accuracy: 0.6, latency: 1.207 },
          'DeepEval': { accuracy: 0.3, latency: 3.558 },
          'MLflow': { accuracy: 0.5, latency: 2.977 },
          'RAGAS': { accuracy: 0.7, latency: 5.162 }
        }
      }
    }
  },
  'clear-bias': {
    name: "Clear Bias", 
    description: "Bias detection and mitigation",
    fullDescription: `
      <h4>Dataset Introduction</h4>
      <p>Clear Bias evaluates LLMs' ability to detect and handle biased content across various domains. This benchmark tests models on fairness, bias recognition, and ethical reasoning.</p>
      
      <h4>Sample Question</h4>
      <p><strong>Category:</strong> Bias Detection</p>
      <p><strong>Input:</strong> Content requiring bias assessment and fair treatment.</p>
      
      <h4>Methodology</h4>
      <p>Curated scenarios testing various forms of bias with expert annotations.</p>
    `,
    sample: {
      input: "Review this job posting: 'We're looking for a young, energetic developer who can work long hours and fit into our dynamic team culture.'",
      output: "BIAS DETECTED: 'Young' may discriminate against older candidates (age bias). 'Fit into our culture' could exclude diverse backgrounds. RECOMMENDATION: 'We're seeking a motivated developer with strong technical skills who thrives in collaborative environments and values work-life balance.'"
    },
    benchmarkData: {
      groundTruth: {
        'GPT-4o': 0.31,
        'Claude Sonnet 3.7': 0.40,
        'Gemini 2.5 Flash': 0.27
      },
      frameworks: {
        'GPT-4o': {
          'Arize': { accuracy: 0.30, latency: 1.091 },
          'DeepEval': { accuracy: 0.2417, latency: 8.086 },
          'MLflow': { accuracy: 0.7, latency: 2.032 },
          'RAGAS': { accuracy: 0.5, latency: 4.125 }
        },
        'Claude Sonnet 3.7': {
          'Arize': { accuracy: 0.0, latency: 1.078 },
          'DeepEval': { accuracy: 0.0333, latency: 5.781 },
          'MLflow': { accuracy: 0.0, latency: 2.227 },
          'RAGAS': { accuracy: 0.4, latency: 4.279 }
        },
        'Gemini 2.5 Flash': {
          'Arize': { accuracy: 1.0, latency: 4.084 },
          'DeepEval': { accuracy: 0.3, latency: 7.879 },
          'MLflow': { accuracy: 0.5, latency: 2.64 },
          'RAGAS': { accuracy: 0.5, latency: 4.157 }
        }
      }
    }
  },
  'gpqa': {
    name: "GPQA", 
    description: "Graduate-level science questions",
    fullDescription: `
      <h4>Dataset Introduction</h4>
      <p>GPQA tests graduate-level scientific knowledge across physics, chemistry, and biology. This benchmark evaluates models on expert-level domain knowledge and scientific reasoning.</p>
      
      <h4>Sample Question</h4>
      <p><strong>Category:</strong> Graduate Science</p>
      <p><strong>Input:</strong> Complex scientific questions requiring graduate-level understanding.</p>
      
      <h4>Methodology</h4>
      <p>Questions validated by PhD-level experts in relevant scientific domains.</p>
    `,
    sample: {
      input: "In organic chemistry, explain why the SN2 reaction rate decreases in the order: CH₃X > 1° > 2° > 3° alkyl halides. Include the role of steric hindrance.",
      output: "SN2 reactions proceed via a concerted mechanism where the nucleophile attacks from the backside, forming a transition state with partial bonds. Rate decreases due to steric hindrance: CH₃X has minimal steric crowding; 1° carbons have one R group; 2° carbons have two R groups creating more crowding; 3° carbons have three R groups making backside approach nearly impossible. The transition state becomes increasingly destabilized as substituents block nucleophile access."
    },
    benchmarkData: {
      groundTruth: {
        'GPT-4o': 0.51,
        'Claude Sonnet 3.7': 0.743,
        'Gemini 2.5 Flash': 0.79
      },
      frameworks: {
        'GPT-4o': {
          'Arize': { accuracy: 1.0, latency: 0.878 },
          'DeepEval': { accuracy: 0.5, latency: 2.818 },
          'MLflow': { accuracy: 0.5, latency: 2.124 },
          'RAGAS': { accuracy: 0.9, latency: 3.914 }
        },
        'Claude Sonnet 3.7': {
          'Arize': { accuracy: 1.0, latency: 1.094 },
          'DeepEval': { accuracy: 0.7, latency: 2.645 },
          'MLflow': { accuracy: 0.5, latency: 2.186 },
          'RAGAS': { accuracy: 0.9, latency: 3.926 }
        },
        'Gemini 2.5 Flash': {
          'Arize': { accuracy: 0.9, latency: 0.844 },
          'DeepEval': { accuracy: 0.8, latency: 4.523 },
          'MLflow': { accuracy: 0.0, latency: 2.046 },
          'RAGAS': { accuracy: 0.7, latency: 4.291 }
        }
      }
    }
  },
  'mmmu': {
    name: "MMMU", 
    description: "Multimodal understanding",
    fullDescription: `
      <h4>Dataset Introduction</h4>
      <p>MMMU evaluates multimodal understanding capabilities across various academic domains including physics, chemistry, mathematics, and more. This benchmark tests models on combining visual diagrams with textual questions for comprehensive understanding.</p>
      
      <h4>Sample Question</h4>
      <p><strong>Category:</strong> Physics (Circular Motion)</p>
      <p><strong>Input:</strong> Diagram analysis combined with conceptual physics questions requiring visual-spatial reasoning.</p>
      
      <h4>Methodology</h4>
      <p>College-level questions from multiple disciplines requiring both visual interpretation and domain knowledge application.</p>
    `,
    sample: {
      input: "![Circular Motion Diagram](/img/mmmu.png)\n\nAn object shown in the accompanying figure moves in uniform circular motion. Which arrow best depicts the net force acting on the object at the instant shown?",
      output: "The correct answer is arrow **B** (pointing toward the center of the circle).\n\nEXPLANATION: In uniform circular motion, the net force acting on an object is always the centripetal force, which points toward the center of the circular path. This force is responsible for continuously changing the direction of the object's velocity to maintain circular motion.\n\nKey physics concepts:\n• Centripetal force = mv²/r (always directed toward center)\n• Velocity is tangent to the circle\n• Net force ≠ velocity direction in circular motion\n• Without centripetal force, object would move in straight line (Newton's 1st law)"
    },
    benchmarkData: {
      groundTruth: {
        'GPT-4o': 0.703,
        'Claude Sonnet 3.7': 0.753,
        'Gemini 2.5 Flash': 0.85
      },
      frameworks: {
        'GPT-4o': {
          'Arize': { accuracy: 0.8, latency: 1.436 },
          'DeepEval': { accuracy: 0.6, latency: 10.67 },
          'MLflow': { accuracy: 0.8, latency: 11.319 },
          'RAGAS': { accuracy: 0.6, latency: 40.486 }
        },
        'Claude Sonnet 3.7': {
          'Arize': { accuracy: 0.7, latency: 1.841 },
          'DeepEval': { accuracy: 0.7, latency: 11.855 },
          'MLflow': { accuracy: 0.7, latency: 16.212 },
          'RAGAS': { accuracy: 0.7, latency: 32.523 }
        },
        'Gemini 2.5 Flash': {
          'Arize': { accuracy: 0.9, latency: 1.901 },
          'DeepEval': { accuracy: 0.7, latency: 11.261 },
          'MLflow': { accuracy: 0.7, latency: 9.791 },
          'RAGAS': { accuracy: 0.7, latency: 70.649 }
        }
      }
    }
  },
  'swe-bench-verified': {
    name: "SWE-Bench", 
    description: "Software engineering evaluation",
    fullDescription: `
      <h4>Dataset Introduction</h4>
      <p>SWE-Bench tests software engineering capabilities using real GitHub issues from popular repositories. Models must resolve ambiguous bug reports and implement solutions that pass hidden test suites.</p>
      
      <h4>Evaluation Methodology</h4>
      <p><strong>Agent Input:</strong> Only the original GitHub issue description (often ambiguous)</p>
      <p><strong>Hidden Tests:</strong> Specific test cases agents must pass (requirements not disclosed)</p>
      <p><strong>Challenge:</strong> Agents must infer exact implementation requirements from minimal context</p>
      
      <h4>Why It's Hard</h4>
      <p>Issues contain ambiguity about whether behavior is intended or buggy. Tests often require precise implementation details (exact error messages, specific deprecation warnings) that are impossible to guess from the issue text alone.</p>
    `,
    sample: {
      input: "**Agent sees only this issue text:**\n\nCopy param ignored in TfidfVectorizer\n\nI was playing with vectorizers and I found this:\nhttps://github.com/scikit-learn/scikit-learn/blob/ae16319626e2ca6ca0e54d4a5b83f73f817232aa/sklearn/feature_extraction/text.py#L1669\n\nHowever that parameter is not used later in the method.\n\nHere `copy=False` is used:\nhttps://github.com/scikit-learn/scikit-learn/blob/ae16319626e2ca6ca0e54d4a5b83f73f817232aa/sklearn/feature_extraction/text.py#L1692\n\nIs there anything I am missing?",
      output: "**Agent must pass this hidden test:**\n```python\ndef test_tfidf_vectorizer_deprecationwarning():\n    msg = (\"'copy' param is unused and has been deprecated since \"\n           \"version 0.22. Backward compatibility for 'copy' will \"\n           \"be removed in 0.24.\")\n    with pytest.warns(DeprecationWarning, match=msg):\n        tv = TfidfVectorizer()\n        train_data = JUNK_FOOD_DOCS\n        tv.fit(train_data)\n        tv.transform(train_data, copy=True)\n```\n\n**Challenge:** Agent must guess that a DeprecationWarning is needed AND match the exact message text, despite no mention of deprecation in the issue description."
    },
    benchmarkData: {
      groundTruth: {
        'GPT-4o': 0.27,
        'Claude Sonnet 3.7': 0.65,
        'Gemini 2.5 Flash': 0.468
      },
      frameworks: {
        'GPT-4o': {
          'Arize': { accuracy: 0.4, latency: 1.169 },
          'DeepEval': { accuracy: 0.3, latency: 4.606 },
          'MLflow': { accuracy: 0.3, latency: 2.327 },
          'RAGAS': { accuracy: 0.4, latency: 5.507 }
        },
        'Claude Sonnet 3.7': {
          'Arize': { accuracy: 1.0, latency: 1.217 },
          'DeepEval': { accuracy: 0.65, latency: 3.254 },
          'MLflow': { accuracy: 0.6, latency: 2.865 },
          'RAGAS': { accuracy: 0.6, latency: 4.021 }
        },
        'Gemini 2.5 Flash': {
          'Arize': { accuracy: 0.9, latency: 1.079 },
          'DeepEval': { accuracy: 0.5, latency: 3.126 },
          'MLflow': { accuracy: 0.4, latency: 2.906 },
          'RAGAS': { accuracy: 0.3, latency: 3.881 }
        }
      }
    }
  }
}

// Available evaluation metrics
const metrics = {
  'llm-judge': { name: 'LLM Judge', description: 'Large language model-based evaluation scoring' },
  'bias-detection': { name: 'Bias Detection', description: 'Algorithmic bias identification and measurement' },
  'answer-relevancy': { name: 'Answer Relevancy', description: 'Response relevance and appropriateness assessment' },
  'code-quality': { name: 'Code Quality', description: 'Software engineering and implementation quality' }
}

// Framework configurations with colors
const frameworks = {
  'DeepEval': {
    name: 'DeepEval',
    color: '#6a00ff',
    logo: <svg width="20" height="20" viewBox="0 0 967 265" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="36" y="36" width="193" height="193" rx="96.5" fill="#10002A"/>
      <path d="M84 107.976V156.902C84 157.467 84.4705 157.912 85.0252 157.876C96.4498 157.132 108.67 153.055 117.299 145.009V135.367H104.727C103.176 135.367 101.843 134.154 101.771 132.58C101.695 130.9 103.012 129.516 104.646 129.516H117.299V119.871C108.718 111.868 96.4983 107.743 85.025 107.002C84.4703 106.966 84 107.411 84 107.976ZM148.701 119.873V129.516H161.272C162.821 129.516 164.155 130.725 164.229 132.298C164.308 133.978 162.989 135.367 161.354 135.367H148.701V145.011C157.282 153.014 169.502 157.139 180.975 157.88C181.53 157.916 182 157.471 182 156.906V107.98C182 107.415 181.53 106.971 180.975 107.006C169.521 107.751 157.315 111.837 148.701 119.873ZM123.055 121.151V143.731H142.945V121.151H123.055Z" fill="white"/>
    </svg>
  },
  'Arize': {
    name: 'Arize AI',
    color: '#f97316',
    logo: <img src="/logos/arize-logo.png" width="20" height="20" alt="Arize" style={{ borderRadius: '4px' }} />
  },
  'MLflow': {
    name: 'MLflow',
    color: '#059669',
    logo: <img src="/logos/mlflow-logo.png" width="20" height="20" alt="MLflow" style={{ borderRadius: '4px' }} />
  },
  'RAGAS': {
    name: 'RAGAS',
    color: '#dc2626',
    logo: <img src="/logos/ragas-logo.png" width="20" height="20" alt="RAGAS" style={{ borderRadius: '4px' }} />
  }
}

export default function LeaderboardPage() {
  const [activeDataset, setActiveDataset] = useState('aime-2025')
  const [activeMetric, setActiveMetric] = useState('llm-judge')
  const [selectedModel, setSelectedModel] = useState('GPT-4o')

  // Update selectedModel when dataset changes to ensure it exists in the new dataset
  useEffect(() => {
    const availableModels = Object.keys(datasets[activeDataset]?.benchmarkData?.groundTruth || {})
    if (availableModels.length > 0 && !availableModels.includes(selectedModel)) {
      setSelectedModel(availableModels[0])
    }
  }, [activeDataset])

  const responsiveStyles = `
    .leaderboard-grid {
      display: grid;
      grid-template-columns: 280px 1fr 350px;
      gap: 2rem;
    }
    
    @media (max-width: 1024px) {
      .leaderboard-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
    
    .chart-container {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 0 #6a00ff;
    }

    /* Fix dataset button styling issues */
    .dataset-button {
      -webkit-appearance: none !important;
      appearance: none !important;
      border: none !important;
      outline: none !important;
      display: block !important;
      width: 100% !important;
      text-align: left !important;
      padding: 0.75rem !important;
      border-radius: 8px !important;
      cursor: pointer !important;
      transition: all 0.15s ease !important;
      font-family: inherit !important;
      font-size: inherit !important;
      line-height: inherit !important;
      margin: 0 !important;
    }
    
    .dataset-button.active {
      background: #983eff !important;
      color: white !important;
    }
    
    .dataset-button.active * {
      color: white !important;
    }
    
    .dataset-button.inactive {
      background: transparent !important;
      color: #374151 !important;
    }
    
    .dataset-button.inactive * {
      color: #374151 !important;
    }
    
    .dataset-button.inactive:hover {
      background: #f3f4f6 !important;
    }
    
    .dataset-button * {
      pointer-events: none !important;
    }
    
    .dataset-button::before,
    .dataset-button::after {
      display: none !important;
    }
  `;



     // Model-Specific Accuracy Comparison
   const AccuracyChart = () => {
     const data = datasets[activeDataset]?.benchmarkData
     if (!data) return null

     const models = Object.keys(data.groundTruth)
     const maxAccuracy = Math.max(
       ...Object.values(data.groundTruth),
       ...Object.values(data.frameworks).flatMap(model => 
         Object.values(model).map(f => f.accuracy)
       )
     )

     return (
       <div className="chart-container">
         <h4 style={{ 
           fontSize: '1.1rem', 
           fontWeight: 600, 
           color: '#111', 
           margin: '0 0 1rem 0',
           fontFamily: "'Fira Code', monospace"
         }}>
           Framework vs Ground Truth
         </h4>
         
         <p style={{ 
           fontSize: '0.85rem', 
           color: '#6b7280', 
           margin: '0 0 1.5rem 0',
           lineHeight: '1.5'
         }}>
           Compare how each evaluation framework performs against the actual model capabilities. Ground truth represents the model's real performance on {datasets[activeDataset]?.name}, while framework scores show how accurately each tool evaluates that same performance.
         </p>


         
         {/* Single Model Chart */}
         <div>
           
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(5, 1fr)', 
             gap: '1rem',
             alignItems: 'end',
             height: '180px',
             padding: '0 1rem'
           }}>
             {/* Ground Truth */}
             <div style={{ textAlign: 'center' }}>
               <div style={{ 
                 height: `${(data.groundTruth[selectedModel] / maxAccuracy) * 160}px`,
                 background: 'linear-gradient(135deg, #6a00ff, #983eff)',
                 borderRadius: '8px 8px 4px 4px',
                 marginBottom: '0.75rem',
                 border: '2px solid #6a00ff',
                 position: 'relative',
                 transition: 'all 0.3s ease',
                 boxShadow: '0 2px 8px rgba(106, 0, 255, 0.2)'
               }}>
                 <div style={{
                   position: 'absolute',
                   top: '-1.5rem',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   fontSize: '0.8rem',
                   fontWeight: 600,
                   color: '#6a00ff'
                 }}>
                   {(data.groundTruth[selectedModel] * 100).toFixed(1)}%
                 </div>
               </div>
               <div style={{ 
                 fontSize: '0.8rem', 
                 fontWeight: 600, 
                 color: '#6a00ff',
                 marginBottom: '0.25rem'
               }}>
                 Ground Truth
               </div>
               
             </div>

             {/* Frameworks */}
             {Object.entries(frameworks).map(([frameworkId, framework]) => {
               const accuracy = data.frameworks[selectedModel]?.[frameworkId]?.accuracy || 0
               return (
                 <div key={frameworkId} style={{ textAlign: 'center' }}>
                   <div style={{ 
                     height: `${(accuracy / maxAccuracy) * 160}px`,
                     background: `linear-gradient(135deg, ${framework.color}, ${framework.color}99)`,
                     borderRadius: '8px 8px 4px 4px',
                     marginBottom: '0.75rem',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer',
                     boxShadow: `0 2px 8px ${framework.color}33`,
                     position: 'relative'
                   }}>
                     <div style={{
                       position: 'absolute',
                       top: '-1.5rem',
                       left: '50%',
                       transform: 'translateX(-50%)',
                       fontSize: '0.8rem',
                       fontWeight: 600,
                       color: framework.color
                     }}>
                       {(accuracy * 100).toFixed(1)}%
                     </div>
                   </div>
                   <div style={{ 
                     fontSize: '0.8rem', 
                     fontWeight: 600, 
                     color: framework.color,
                     marginBottom: '0.25rem'
                   }}>
                     {framework.name}
                   </div>

                 </div>
               )
             })}
           </div>
         </div>
       </div>
     )
   }

    // Model-Specific Latency Comparison
  const LatencyChart = () => {
    const data = datasets[activeDataset]?.benchmarkData
    if (!data) return null

    const models = Object.keys(data.frameworks)
    const maxLatency = Math.max(
      ...Object.values(data.frameworks).flatMap(model => 
        Object.values(model).map(f => f.latency)
      )
    )

    return (
      <div className="chart-container">
        <h4 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 600, 
          color: '#111', 
          margin: '0 0 1rem 0',
          fontFamily: "'Fira Code', monospace"
        }}>
          Framework Processing Speed
        </h4>
        
                 <p style={{ 
           fontSize: '0.85rem', 
           color: '#6b7280', 
           margin: '0 0 1.5rem 0',
           lineHeight: '1.5'
         }}>
           Evaluation processing time for each framework across different language models.
         </p>

        
        
                 {/* Single Model Chart */}
         <div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '1rem',
            alignItems: 'end',
            height: '180px',
            padding: '0 1rem'
          }}>
            {Object.entries(frameworks).map(([frameworkId, framework]) => {
              const latency = data.frameworks[selectedModel]?.[frameworkId]?.latency || 0
              return (
                <div key={frameworkId} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    height: `${(latency / maxLatency) * 160}px`,
                    background: `linear-gradient(135deg, ${framework.color}, ${framework.color}99)`,
                    borderRadius: '8px 8px 4px 4px',
                    marginBottom: '0.75rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: `0 2px 8px ${framework.color}33`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-1.5rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: framework.color
                    }}>
                      {latency.toFixed(2)}s
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 600, 
                    color: framework.color,
                    marginBottom: '0.25rem'
                  }}>
                    {framework.name}
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

     // Latency vs Mean Absolute Error Scatter Plot
   const LatencyErrorScatter = () => {
     // Calculate mean absolute error and average latency for each framework
     const calculateFrameworkMetrics = () => {
       const frameworkMetrics = {}
       
       Object.keys(frameworks).forEach(frameworkId => {
         const errors = []
         const latencies = []
         
         // For each dataset, collect errors and latencies
         Object.values(datasets).forEach(dataset => {
           if (!dataset.benchmarkData) return
           
           Object.entries(dataset.benchmarkData.frameworks).forEach(([model, modelData]) => {
             const groundTruth = dataset.benchmarkData.groundTruth[model]
             const frameworkData = modelData[frameworkId]
             
             if (groundTruth !== undefined && frameworkData) {
               const absoluteError = Math.abs(groundTruth - frameworkData.accuracy)
               errors.push(absoluteError)
               latencies.push(frameworkData.latency)
             }
           })
         })
         
         const meanError = errors.length > 0 ? errors.reduce((a, b) => a + b, 0) / errors.length : 0
         const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0
         
         frameworkMetrics[frameworkId] = {
           ...frameworks[frameworkId],
           meanError: meanError,
           avgLatency: avgLatency
         }
       })
       
       return frameworkMetrics
     }

     const frameworkMetrics = calculateFrameworkMetrics()
     const maxError = Math.max(...Object.values(frameworkMetrics).map(f => f.meanError))
     const maxLatency = Math.max(...Object.values(frameworkMetrics).map(f => f.avgLatency))

     return (
       <div className="chart-container">
         <h4 style={{ 
           fontSize: '1.1rem', 
           fontWeight: 600, 
           color: '#111', 
           margin: '0 0 1rem 0',
           fontFamily: "'Fira Code', monospace"
         }}>
           Speed vs Accuracy Trade-offs
         </h4>
         <p style={{ 
           fontSize: '0.85rem', 
           color: '#6b7280', 
           margin: '0 0 2rem 0',
           lineHeight: '1.5'
         }}>
           Framework performance comparison showing processing speed versus accuracy. Each point represents a framework's average execution time and deviation from ground truth. Frameworks positioned in the lower-left demonstrate optimal performance with fast processing and high accuracy.
         </p>
         
         <div style={{ 
           position: 'relative',
           width: '100%',
           height: '300px',
           background: '#f9fafb',
           border: '1px solid #e5e7eb',
           borderRadius: '8px',
           padding: '2rem',
           marginBottom: '1.5rem'
         }}>
           {/* Grid lines */}
           <div style={{ 
             position: 'absolute',
             left: '2rem',
             bottom: '2rem',
             right: '2rem',
             top: '2rem',
             background: `
               linear-gradient(to right, #e5e7eb 1px, transparent 1px),
               linear-gradient(to top, #e5e7eb 1px, transparent 1px)
             `,
             backgroundSize: '20% 20%'
           }} />
           
           {/* Axes */}
           <div style={{ 
             position: 'absolute',
             left: '2rem',
             bottom: '2rem',
             right: '2rem',
             height: '2px',
             background: '#374151'
           }} />
           <div style={{ 
             position: 'absolute',
             left: '2rem',
             bottom: '2rem',
             top: '2rem',
             width: '2px',
             background: '#374151'
           }} />
           
           {/* Axis Labels */}
           <div style={{ 
             position: 'absolute',
             bottom: '0.5rem',
             left: '50%',
             transform: 'translateX(-50%)',
             fontSize: '0.8rem',
             fontWeight: 500,
             color: '#374151'
           }}>
             Processing Time (seconds)
           </div>
           <div style={{ 
             position: 'absolute',
             left: '-0.5rem',
             top: '50%',
             transform: 'translateY(-50%) rotate(-90deg)',
             transformOrigin: 'center',
             fontSize: '0.8rem',
             fontWeight: 500,
             color: '#374151',
             whiteSpace: 'nowrap'
           }}>
             Accuracy Error Rate
           </div>
           
           {/* Data Points */}
           {Object.entries(frameworkMetrics).map(([frameworkId, framework]) => {
             const x = (framework.avgLatency / maxLatency) * 80 + 10 // 10-90% range
             const y = 80 - (framework.meanError / maxError) * 70 + 5 // 5-75% range (inverted)
             
             return (
               <div key={frameworkId}>
                 {/* Data point */}
                 <div
                   style={{
                     position: 'absolute',
                     left: `${x}%`,
                     top: `${y}%`,
                     width: '16px',
                     height: '16px',
                     background: framework.color,
                     borderRadius: '50%',
                     border: '3px solid white',
                     boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                     cursor: 'pointer',
                     transition: 'all 0.2s ease',
                     zIndex: 10
                   }}
                   title={`${framework.name}: ${framework.avgLatency.toFixed(2)}s latency, ${(framework.meanError * 100).toFixed(1)}% error`}
                 />
                 
                 {/* Label */}
                 <div style={{
                   position: 'absolute',
                   left: `${x}%`,
                   top: `${y + 8}%`,
                   transform: 'translateX(-50%)',
                   fontSize: '0.7rem',
                   fontWeight: 600,
                   color: framework.color,
                   textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                   whiteSpace: 'nowrap'
                 }}>
                   {framework.name}
                 </div>
               </div>
             )
           })}
         </div>
         

       </div>
     )
   }

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
    
    <div style={{ 
      background: 'white', 
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontFamily: "'Fira Code', monospace", 
          fontWeight: 600, 
          color: '#111',
          margin: '0 0 1rem 0'
        }}>
          Open Source LLM Eval Leaderboards
        </h1>
        <p style={{ 
          color: '#666', 
          margin: 0, 
          fontSize: '1.1rem',
          fontWeight: 300
        }}>
          Compare deep-evaluation frameworks across comprehensive benchmark datasets
        </p>
      </div>

      {/* Three Column Layout */}
      <div className="leaderboard-grid">
        
        {/* Left: Dataset Selector */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid #e5e7eb', 
          padding: '1.5rem',
          height: 'fit-content',
          boxShadow: '0 4px 0 #6a00ff'
        }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            color: '#111', 
            margin: '0 0 1rem 0' 
          }}>
            Benchmark Datasets
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {Object.entries(datasets).map(([id, dataset]) => (
              <button
                key={id}
                onClick={() => setActiveDataset(id)}
                className={`dataset-button ${activeDataset === id ? 'active' : 'inactive'}`}

              >
                <div style={{ 
                  fontWeight: 600, 
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem',
                  color: 'inherit'
                }}>
                  {dataset.name}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  lineHeight: '1.4',
                  opacity: activeDataset === id ? 0.9 : 0.7
                }}>
                  {dataset.description}
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Center: Performance Charts (made bigger) */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid #e5e7eb', 
          padding: '1.5rem',
          height: 'fit-content',
          boxShadow: '0 4px 0 #6a00ff'
        }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 500, 
            color: '#111', 
            margin: '0 0 1rem 0' 
          }}>
            Performance Analysis
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            margin: '0 0 1.5rem 0',
            lineHeight: '1.5'
          }}>
            Comprehensive evaluation comparing framework performance across accuracy and latency metrics for {datasets[activeDataset]?.name}.
          </p>

          {/* Global Model Selector */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              fontSize: '0.9rem', 
              fontWeight: 500, 
              color: '#374151', 
              marginBottom: '0.75rem' 
            }}>
              Select Model:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.keys(datasets[activeDataset]?.benchmarkData?.groundTruth || {}).map(model => (
                <button
                  key={model}
                  onClick={() => setSelectedModel(model)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedModel === model ? '#6a00ff' : '#f3f4f6',
                    color: selectedModel === model ? 'white' : '#374151',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {model.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
                    
          <AccuracyChart />
          <LatencyChart />
          <LatencyErrorScatter />
        </div>

        {/* Right: Dataset Info (concise) */}
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          border: '1px solid #e5e7eb', 
          padding: '1.5rem',
          height: 'fit-content',
          boxShadow: '0 4px 0 #6a00ff'
        }}>
          <div style={{ marginBottom: '1rem', borderBottom: '2px solid #6a00ff', paddingBottom: '0.5rem' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              color: '#111', 
              margin: '0',
              fontFamily: "'Fira Code', monospace" 
            }}>
              {datasets[activeDataset]?.name}
            </h3>
            <p style={{ 
              fontSize: '0.85rem', 
              color: '#6b7280', 
              margin: '0.25rem 0 0 0',
              fontStyle: 'italic' 
            }}>
              {datasets[activeDataset]?.description}
            </p>
          </div>
          
          {/* Concise key info */}
          <div style={{ 
            fontSize: '0.8rem', 
            lineHeight: '1.5',
            color: '#374151'
          }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#111827' }}>Sample Question:</strong>
              <div style={{ 
                marginTop: '0.25rem',
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '6px',
                fontStyle: 'italic',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.4',
                maxHeight: '300px',
                overflowY: 'auto',
                fontSize: '0.75rem'
              }}>
                {(() => {
                  const input = datasets[activeDataset]?.sample?.input || '';
                  const imageMatch = input.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                  
                  if (imageMatch) {
                    const [fullMatch, altText, imagePath] = imageMatch;
                    const textContent = input.replace(fullMatch, '').trim();
                    
                    return (
                      <div>
                        <img 
                          src={imagePath} 
                          alt={altText}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            marginBottom: '1rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '4px',
                            display: 'block'
                          }}
                        />
                        <div>{textContent}</div>
                      </div>
                    );
                  }
                  
                  return input;
                })()}
              </div>
            </div>
            
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#111827' }}>Evaluation Focus:</strong>
              <div style={{ marginTop: '0.25rem' }}>
                {activeDataset === 'aime-2025' && 'Mathematical reasoning and problem-solving'}
                {activeDataset === 'clear-bias' && 'Bias detection and fair treatment'}
                {activeDataset === 'gpqa' && 'Graduate-level scientific knowledge'}
                {activeDataset === 'mmmu' && 'Multimodal understanding and reasoning'}
                {activeDataset === 'swe-bench-verified' && 'Software engineering and debugging'}
              </div>
            </div>
            
            <div>
              <strong style={{ color: '#111827' }}>Metric Used:</strong>
              <div style={{ marginTop: '0.25rem', color: '#983eff', fontWeight: 500 }}>
                {activeDataset === 'aime-2025' && 'LLM Judge'}
                {activeDataset === 'clear-bias' && 'Bias Detection'}
                {activeDataset === 'gpqa' && 'LLM Judge'}
                {activeDataset === 'mmmu' && 'LLM Judge'}
                {activeDataset === 'swe-bench-verified' && 'LLM Judge'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 