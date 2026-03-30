import { PortableTextBlock } from "sanity"

export type Hero = {
    _id: string,
    _createdAt: Date,
    title: string,
    heroImage: string,
    description: PortableTextBlock[]
}