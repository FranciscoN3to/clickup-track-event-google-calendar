import { z } from "zod";
import { DateTime } from "luxon";

export type FormTrack = {
  calendar_id: string;
  start_date: string;
  end_date: string;
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
