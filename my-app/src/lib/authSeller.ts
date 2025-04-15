import { clerkClient } from "@clerk/clerk-sdk-node";

const authSeller = async (userId: string): Promise<boolean> => {
  try {
    console.log("User ID đang kiểm tra:", userId);
    const user = await clerkClient.users.getUser(userId);
    return user.publicMetadata.role === "admin";
  } catch (error: any) {
    console.error("authSeller error:", error.message);
    return false;
  }
};

export default authSeller;
