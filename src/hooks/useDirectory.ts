import { useRouter } from "next/router";
import  { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaReddit } from "react-icons/fa";
import { communityState } from "../components/atoms/communitiesAtom";
import { defaultMenuItem, DirectoryMenuItem, directoryMenuState } from "../components/atoms/directoryMenuAtom";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();

  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    router?.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { community } = router.query;

      const existingCommunity = communityStateValue.currentCommunity;
      
      if(!existingCommunity) return

    if (existingCommunity.id) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${existingCommunity.id}`,
          link: `r/${existingCommunity.id}`,
          icon: FaReddit,
          iconColor: "blue.500",
          imageURL: existingCommunity.imageUrl,
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
  }, [communityStateValue.currentCommunity]);


  return { directoryState, onSelectMenuItem, toggleMenuOpen };
};

export default useDirectory;
