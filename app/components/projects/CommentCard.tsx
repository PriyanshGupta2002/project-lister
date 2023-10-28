"use client";
import { SafeComment, SafeUser } from "@/app/types";
import { daysAgo } from "@/app/utils/giveDate";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { PiUserCircleLight } from "react-icons/pi";
interface CommentCardProps {
  comment: SafeComment & {
    User: SafeUser;
  };
  currentUserId?: string;
}
const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  currentUserId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.delete(`/api/comment/${comment.id}`);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setIsDeleting(false);
    }
  }, [comment.id, router]);
  const agoTimeStamp = useMemo(() => {
    return daysAgo(comment.createdAt);
  }, [comment.createdAt]);
  return (
    <div className="flex flex-col gap-2 border-b-2 border-zinc-300 p-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {comment.User.image ? (
            <Image
              alt="user"
              src={comment.User.image}
              height={30}
              width={30}
              className="rounded-full object-cover"
            />
          ) : (
            <PiUserCircleLight size={30} />
          )}
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">
              {comment.User.name}
            </span>
            <span className="text-sm text-neutral-300">{agoTimeStamp}</span>
          </div>
        </div>

        {comment.User.id === currentUserId && (
          <button
            title="Delete"
            disabled={isDeleting}
            type="button"
            className="bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-400 rounded-md group hover:bg-rose-600 transition p-3 cursor-pointer"
          >
            <AiOutlineDelete size={20} onClick={handleDelete} />
          </button>
        )}
      </div>
      <div className="text-base md:text-base text-neutral-300 font-medium">
        {comment.message}
      </div>
    </div>
  );
};

export default CommentCard;
