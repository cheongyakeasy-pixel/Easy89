export type GuideCategory = 'basic' | 'eligibility' | 'score' | 'documents' | 'process';

export interface ReferenceLink {
  label: string;
  url: string;
}

export interface GuideSection {
  heading: string;
  body: string;
  checklist?: string[];
}

export interface Guide {
  id: string;
  title: string;
  category: GuideCategory;
  summary: string;
  sections: GuideSection[];
  relatedLinks: ReferenceLink[];
}
