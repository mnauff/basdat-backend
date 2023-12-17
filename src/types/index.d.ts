import { ROLES } from "../service/account.service";

export interface DecodedUserData {
    user_id: string;
    email: string;
    role: ROLES;
    student: string | '' | undefined | null;
    assistant: string | '' | undefined | null;
}