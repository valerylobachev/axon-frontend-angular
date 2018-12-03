export interface SchemaSummary {
  id: string,
  name: string,
  description?: string,
  notation: string
}

export interface Schema extends SchemaSummary{
  schema: string
}