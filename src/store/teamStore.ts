import { create } from 'zustand';
import { TeamMember } from '../types';

interface TeamState {
  members: TeamMember[];
  isLoading: boolean;
  error: string | null;
  setMembers: (members: TeamMember[]) => void;
  addMember: (member: TeamMember) => void;
  updateMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useTeamStore = create<TeamState>((set) => ({
  members: [],
  isLoading: false,
  error: null,
  setMembers: (members) => set({ members }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMember: (id, updates) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      ),
    })),
  deleteMember: (id) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== id),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

export default useTeamStore;
