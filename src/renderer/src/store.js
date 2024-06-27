import { create } from 'zustand';

export const useStore = create((set) => ({
  likesCount: 51,
  setLikesCount: (data) => set({ likesCount: data }),
  goal: 50,
  setGoal: (data) => set({ goal: data }),
  shimmer: false,
  setShimmer: (data) => set({ shimmer: data })
}));
