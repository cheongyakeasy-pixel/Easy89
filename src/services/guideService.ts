import { guides } from '../data/guides';
import { loanGuides } from '../data/loanGuides';

export function listGuides() {
  return guides;
}

export function getGuideById(id: string) {
  return guides.find((guide) => guide.id === id);
}

export function listLoanGuides() {
  return loanGuides;
}
