import { PortableTextBlock } from "sanity"

export type Project = {
    _id: string,
    _createdAt: Date,
    name: string,
    slug: string,
    category: string,
    images: string[],
    coverImage: string,
    techStack: string[],
    url: string,
    content: PortableTextBlock[]
}