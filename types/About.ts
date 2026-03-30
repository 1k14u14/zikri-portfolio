import { PortableTextBlock } from "sanity"

export type About = {
    _id: string,
    _createdAt: Date,
    title: string,
    avatar: string,
    resume: PortableTextBlock[],
    hardSkills: string[],
    softSkills: string[],
    certification: string[],
    experience: string[],
    educations: string[]
}