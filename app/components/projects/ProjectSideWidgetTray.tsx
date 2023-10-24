"use client";
import { useLogin } from "@/app/hooks/useLogin";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  FacebookIcon,
  FacebookShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
interface SideWidgetTrayProps {
  currentUser?: SafeUser;
  projectId: string;
}
const SideWidgetTray: React.FC<SideWidgetTrayProps> = ({
  currentUser,
  projectId,
}) => {
  const isFavorite = currentUser?.favoriteProjects.includes(projectId);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    if (typeof window !== undefined) {
      setShareUrl(window.location.href);
    }
  }, []);

  const loginModal = useLogin();
  const router = useRouter();
  const handleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        const { data } = await axios.get(`/api/favorite/${projectId}`);
        router.refresh();
        toast.success(data.message);
      } catch (error) {
        toast.error("Some error occured");
      }
    },
    [currentUser, loginModal, projectId, router]
  );
  return (
    <div className="flex items-center gap-5 cursor-pointer flex-wrap">
      <div className="flex items-center border-2 border-neutral-400 p-3 px-4 rounded-full gap-5">
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon
            size={30}
            className="rounded-md hover:-rotate-45 transition"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon
            size={30}
            className="rounded-md  hover:-rotate-45 transition"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon
            size={30}
            className="rounded-md hover:-rotate-45 transition"
          />
        </LinkedinShareButton>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon
            size={30}
            className="rounded-md hover:-rotate-45 transition"
          />
        </FacebookShareButton>
        <EmailShareButton url={shareUrl}>
          <EmailIcon
            size={30}
            className="rounded-md hover:-rotate-45 transition"
          />
        </EmailShareButton>
      </div>
      {isFavorite ? (
        <AiFillHeart
          size={26}
          className="text-rose-500"
          onClick={handleFavorite}
        />
      ) : (
        <AiOutlineHeart size={26} onClick={handleFavorite} />
      )}
    </div>
  );
};

export default SideWidgetTray;
