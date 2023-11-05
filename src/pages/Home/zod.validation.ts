import { z } from "zod";
import { DateTime } from "luxon";

export type FormTrack = {
  calendar_id: string;
  start_date: string;
  end_date: string;
};

export type FormClickup = {
  team_id: string;
  user_id: string;
  token: string;
};

const customDateValidation = z.custom((data) => {
  if (DateTime.fromFormat(String(data), "yyyy-MM-dd").isValid) return data;
  return false;
});
export const trackFormValidation = z.object({
  calendar_id: z
    .string()
    .min(1, { message: "Campo obrigatório!" })
    .email("Email inválido!"),
  start_date: customDateValidation,
  end_date: customDateValidation,
});

export const clickupFormValidation = z.object({
  team_id: z.string().min(1, { message: "Campo obrigatório!" }),
  user_id: z.string().min(1, { message: "Campo obrigatório!" }),
  token: z.string().min(1, { message: "Campo obrigatório!" }),
});
