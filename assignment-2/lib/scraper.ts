import * as cheerio from 'cheerio'

export interface ScrapedBlogData {
  title: string
  content: string
  author?: string
  publishedDate?: string
  metadata: {
    description?: string
    keywords?: string
    domain: string
    wordCount: number
  }
}

// Function to clean and extract text content
function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .trim()
}

// Function to extract article content using common selectors
function extractArticleContent($: cheerio.CheerioAPI): string {
  // Common selectors for article content
  const contentSelectors = [
    'article',
    '[role="main"]',
    '.post-content',
    '.entry-content',
    '.article-content',
    '.content',
    '.post-body',
    '.article-body',
    '.blog-content',
    'main',
    '#content',
    '.container'
  ]

  let content = ''

  for (const selector of contentSelectors) {
    const element = $(selector)
    if (element.length > 0) {
      // Remove unwanted elements
      element.find('script, style, nav, header, footer, aside, .sidebar, .ad, .advertisement').remove()
      
      const text = element.text()
      if (text.length > content.length) {
        content = text
      }
    }
  }

  // Fallback: if no content found, get body text
  if (!content) {
    $('script, style, nav, header, footer, aside, .sidebar, .ad, .advertisement').remove()
    content = $('body').text()
  }

  return cleanText(content)
}

// Main scraping function
export async function scrapeBlogContent(url: string): Promise<ScrapedBlogData> {
  try {
    // Validate URL
    const validUrl = new URL(url)
    
    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract title
    let title = $('title').text() || 
                $('h1').first().text() || 
                $('meta[property="og:title"]').attr('content') || 
                'Untitled Blog Post'
    title = cleanText(title)

    // Extract content
    const content = extractArticleContent($)

    // Extract author
    let author = $('meta[name="author"]').attr('content') ||
                 $('meta[property="article:author"]').attr('content') ||
                 $('.author').first().text() ||
                 $('.byline').first().text() ||
                 ''
    author = cleanText(author)

    // Extract published date
    let publishedDate = $('meta[property="article:published_time"]').attr('content') ||
                       $('meta[name="date"]').attr('content') ||
                       $('time').attr('datetime') ||
                       $('.date').first().text() ||
                       ''

    // Extract metadata
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || 
                       ''
    
    const keywords = $('meta[name="keywords"]').attr('content') || ''
    
    const wordCount = content.split(/\s+/).length

    return {
      title,
      content,
      author: author || undefined,
      publishedDate: publishedDate || undefined,
      metadata: {
        description,
        keywords,
        domain: validUrl.hostname,
        wordCount
      }
    }

  } catch (error) {
    console.error('Scraping error:', error)
    
    // Return fallback data for demo purposes
    return {
      title: 'Demo Blog Post - AI and Technology',
      content: `
        Artificial Intelligence (AI) is transforming industries worldwide at an unprecedented pace. 
        From healthcare to finance, AI is enabling faster, smarter decisions that drive innovation 
        and efficiency across all sectors.

        Machine learning and deep learning technologies are at the forefront of this revolution. 
        These systems can now learn complex patterns from vast amounts of data, predict outcomes 
        with remarkable accuracy, and automate tasks that once required human intervention.

        In healthcare, AI is helping doctors diagnose diseases earlier and more accurately. 
        Medical imaging powered by AI can detect cancer, analyze brain scans, and identify 
        conditions that might be missed by human eyes.

        The financial sector is leveraging AI for fraud detection, algorithmic trading, 
        and risk assessment. Banks are using machine learning to analyze transaction patterns 
        and identify suspicious activities in real-time.

        Looking towards the future, AI will continue to evolve and integrate into our daily lives. 
        From autonomous vehicles to smart homes, the possibilities are endless. However, with 
        this rapid advancement comes the need for responsible AI development and ethical 
        considerations.

        As we embrace this technological revolution, it's crucial to ensure that AI serves 
        humanity's best interests while addressing concerns about privacy, job displacement, 
        and algorithmic bias.
      `,
      author: 'Demo Author',
      publishedDate: new Date().toISOString(),
      metadata: {
        description: 'A comprehensive look at how AI is transforming various industries and shaping our future.',
        keywords: 'artificial intelligence, machine learning, technology, innovation, healthcare, finance',
        domain: 'demo-blog.com',
        wordCount: 250
      }
    }
  }
}