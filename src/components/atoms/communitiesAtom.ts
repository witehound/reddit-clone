import { Timestamp } from "firebase/firestore";
import {atom} from "recoil"

export interface Community {
    id: string;
    creatorId: string;
    createdAt: Timestamp;
    numberOfMembers: number;
    privacyType?: string;
    imageUrl?: string 
}

export interface CommunitySnippet {
    communityId: string,
    isModerator?: boolean,
    imageUrl?: string
}

interface CommunityState {
    mySnippets: CommunitySnippet[];
    currentCommunity?: Community;
    initSnippetsFetched : boolean
}

const defaultCommunityState : CommunityState = {
    mySnippets: [],
    initSnippetsFetched : false
}

export const communityState = atom<CommunityState>({
    key: "communityState",
    default : defaultCommunityState
})

