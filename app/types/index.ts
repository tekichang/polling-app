export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Poll {
  id: string
  title: string
  description?: string
  options: PollOption[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  isActive: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: number
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId: string
  createdAt: Date
}

export interface CreatePollData {
  title: string
  description?: string
  options: string[]
  expiresAt?: Date
}
