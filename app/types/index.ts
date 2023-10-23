import { Project, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "updatedAt" | "createdAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string;
};

export type SafeProject = Omit<Project, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
