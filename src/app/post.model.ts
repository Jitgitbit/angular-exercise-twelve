export interface Post {
  title: string,
  content: string,
  id?: string                                // ? ------> so this means it's a string, but it's optional
}