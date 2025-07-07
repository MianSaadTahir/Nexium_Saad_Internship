export const dummyBlogs: { [url: string]: string } = {
    "https://example.com/blog1": `
      Motivation is the reason for people's actions, desires, and needs.
      It's the driving force behind goal-oriented behavior.
      Motivated people are more productive and satisfied.
    `,
    "https://example.com/blog2": `
      Creativity is the use of imagination to create something.
      It’s essential in problem-solving and innovation.
      Encouraging creativity leads to unique ideas and progress.
    `,
};

export function summarizeBlog(content: string): string {
    // Simulate summary by returning the first 1-2 sentences
    const sentences = content.split(".").filter(Boolean);
    return sentences.slice(0, 2).join(". ") + ".";
}
