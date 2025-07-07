// Simulated AI Summary Logic
// This simulates AI behavior using static algorithms

export interface SummaryResult {
  summary: string
  keyPoints: string[]
  readingTime: number
  sentiment: 'positive' | 'neutral' | 'negative'
}

// Function to extract key sentences based on word frequency
function extractKeySentences(content: string, numSentences: number = 3): string[] {
  // Split content into sentences
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 300) // Filter out very short/long sentences

  if (sentences.length <= numSentences) {
    return sentences
  }

  // Calculate word frequency
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3) // Filter out short words

  const wordFreq: Record<string, number> = {}
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1
  })

  // Score sentences based on word frequency
  const sentenceScores = sentences.map(sentence => {
    const sentenceWords = sentence.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)

    const score = sentenceWords.reduce((sum, word) => {
      return sum + (wordFreq[word] || 0)
    }, 0)

    return {
      sentence: sentence.trim(),
      score: score / sentenceWords.length // Average score
    }
  })

  // Sort by score and take top sentences
  return sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, numSentences)
    .map(item => item.sentence)
}

// Function to determine reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200 // Average reading speed
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Function to analyze sentiment (basic)
function analyzeSentiment(content: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome',
    'improve', 'better', 'best', 'success', 'successful', 'effective', 'efficient',
    'innovation', 'advance', 'progress', 'benefit', 'advantage', 'opportunity',
    'solution', 'achieve', 'accomplish', 'win', 'victory', 'positive', 'optimistic'
  ]

  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'fail', 'failure',
    'problem', 'issue', 'challenge', 'difficulty', 'crisis', 'danger',
    'risk', 'threat', 'concern', 'worry', 'negative', 'pessimistic',
    'decline', 'decrease', 'loss', 'damage', 'harm', 'error', 'mistake'
  ]

  const words = content.toLowerCase().split(/\s+/)
  
  let positiveCount = 0
  let negativeCount = 0

  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '')
    if (positiveWords.includes(cleanWord)) positiveCount++
    if (negativeWords.includes(cleanWord)) negativeCount++
  })

  const totalSentimentWords = positiveCount + negativeCount
  if (totalSentimentWords === 0) return 'neutral'

  const positiveRatio = positiveCount / totalSentimentWords
  
  if (positiveRatio > 0.6) return 'positive'
  if (positiveRatio < 0.4) return 'negative'
  return 'neutral'
}

// Function to create formatted key points
function formatKeyPoints(sentences: string[]): string[] {
  return sentences.map((sentence, index) => {
    // Clean up the sentence
    let cleanSentence = sentence.trim()
    if (!cleanSentence.endsWith('.') && !cleanSentence.endsWith('!') && !cleanSentence.endsWith('?')) {
      cleanSentence += '.'
    }
    
    // Capitalize first letter
    cleanSentence = cleanSentence.charAt(0).toUpperCase() + cleanSentence.slice(1)
    
    return `✅ ${cleanSentence}`
  })
}

// Main AI summary function
export function generateAISummary(content: string, title: string): SummaryResult {
  try {
    // Extract key sentences
    const keySentences = extractKeySentences(content, 3)
    
    // Format key points
    const keyPoints = formatKeyPoints(keySentences)
    
    // Create summary text
    const summary = keyPoints.join('\n')
    
    // Calculate reading time
    const readingTime = calculateReadingTime(content)
    
    // Analyze sentiment
    const sentiment = analyzeSentiment(content)
    
    return {
      summary,
      keyPoints,
      readingTime,
      sentiment
    }
  } catch (error) {
    console.error('Error generating summary:', error)
    
    // Fallback summary
    return {
      summary: `✅ This blog post discusses important topics related to the subject matter.
✅ The content provides valuable insights and information for readers.
✅ Key concepts and ideas are presented in an accessible manner.`,
      keyPoints: [
        '✅ This blog post discusses important topics related to the subject matter.',
        '✅ The content provides valuable insights and information for readers.',
        '✅ Key concepts and ideas are presented in an accessible manner.'
      ],
      readingTime: Math.ceil(content.split(/\s+/).length / 200),
      sentiment: 'neutral'
    }
  }
}

// Enhanced summary with topic detection
export function generateEnhancedSummary(content: string, title: string): SummaryResult {
  // Detect main topics
  const topicKeywords = {
    technology: ['technology', 'tech', 'digital', 'software', 'computer', 'internet', 'online', 'app', 'platform'],
    ai: ['artificial intelligence', 'ai', 'machine learning', 'deep learning', 'algorithm', 'automation'],
    business: ['business', 'company', 'market', 'industry', 'finance', 'revenue', 'profit', 'strategy'],
    health: ['health', 'healthcare', 'medical', 'medicine', 'doctor', 'patient', 'treatment', 'disease'],
    education: ['education', 'learning', 'school', 'university', 'student', 'teacher', 'course', 'training'],
    science: ['science', 'research', 'study', 'experiment', 'data', 'analysis', 'discovery']
  }

  const contentLower = content.toLowerCase()
  let detectedTopic = 'general'
  let maxCount = 0

  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    const count = keywords.reduce((sum, keyword) => {
      return sum + (contentLower.includes(keyword) ? 1 : 0)
    }, 0)
    
    if (count > maxCount) {
      maxCount = count
      detectedTopic = topic
    }
  })

  // Generate basic summary
  const basicSummary = generateAISummary(content, title)

  // Enhance based on detected topic
  let enhancedSummary = basicSummary.summary

  if (detectedTopic === 'ai' || detectedTopic === 'technology') {
    enhancedSummary = basicSummary.summary.replace(
      /This blog post discusses/g,
      'This technology article explores'
    )
  } else if (detectedTopic === 'business') {
    enhancedSummary = basicSummary.summary.replace(
      /This blog post discusses/g,
      'This business analysis covers'
    )
  }

  return {
    ...basicSummary,
    summary: enhancedSummary
  }
}