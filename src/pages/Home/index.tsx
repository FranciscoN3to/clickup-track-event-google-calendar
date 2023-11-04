import { timeTracker } from "@services/index";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Label from "@components/Fields/Label";
import Input from "@components/Fields/Input";
import DatePicker from "@components/Fields/DatePicker";
import { FormTrack, trackFormValidation } from "./zod.validation";

function Home() {
  const [isTracking, setTrackingStatus] = useState<boolean>(false);

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTrack>({
    resolver: zodResolver(trackFormValidation),
  });

  console.log({ errors });

  useEffect(() => {
    const [startDate, endDate] = [
      DateTime.local({ zone: "utc" })
        .startOf("day")
        .minus({ days: 5 })
        .startOf("day")
        .toISODate(), // start
      DateTime.local({ zone: "utc" }).startOf("day").endOf("day").toISODate(), // end
    ];

    if (startDate && endDate) {
      resetField("start_date", { defaultValue: startDate });
      resetField("end_date", { defaultValue: endDate });
    }

    const email = localStorage.getItem("calendar-id");
    resetField("calendar_id", { defaultValue: email || "" });
  }, [resetField]);

  const onSubmit = handleSubmit((data) => {
    const { calendar_id, end_date, start_date } = data;
    console.log({ data });
    return;

    if (calendar_id && end_date && start_date) {
      setTrackingStatus(true);

      localStorage.setItem("calendar-id", String(calendar_id));
      const [startDate, endDate] = [
        DateTime.fromISO(String(start_date))
          .startOf("day")
          .startOf("day")
          .toJSDate(), // start
        DateTime.fromISO(String(end_date))
          .startOf("day")
          .endOf("day")
          .toJSDate(), // end
      ];

      toast.info("Iniciando lançamento de horas!", {
        draggable: false,
        hideProgressBar: true,
        theme: "colored",
      });
      timeTracker(String(calendar_id), startDate, endDate)
        .catch(() => {
          toast.error("Aconteceu algo de errado!", {
            draggable: false,
            hideProgressBar: true,
            theme: "colored",
          });
        })
        .then(() => {
          toast.success("Lançamento efetuado com sucesso!", {
            draggable: false,
            hideProgressBar: true,
            theme: "colored",
          });
        })
        .finally(() => {
          setTrackingStatus(false);
        });
    } else {
      toast.error("Preencher os campos devidamente!", {
        draggable: false,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  });

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Lançamento automático de horas
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Preencha os campos correspondentes a data desejada para o lançamento.
        </p>
      </div>
      <div className="mx-auto mt-16" />
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit}>
        <div className="mb-5">
          <Label htmlFor="calendarId">Email</Label>
          <div className="mt-2.5">
            <Input
              id="calendarId"
              type="text"
              status={errors.calendar_id?.message ? "error" : undefined}
              {...register("calendar_id")}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mb-5">
            <Label htmlFor="start_date">Data inicial</Label>
            <div className="mt-2.5">
              <DatePicker
                id="start_date"
                status={errors.start_date?.message ? "error" : undefined}
                {...register("start_date")}
              />
            </div>
          </div>
          <div className="mb-5">
            <Label htmlFor="end_date">Data Final</Label>
            <div className="mt-2.5">
              <DatePicker
                id="end_date"
                status={errors.end_date?.message ? "error" : undefined}
                {...register("end_date")}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            disabled={isTracking}
            className={`h-10 px-6 font-semibold rounded-md border bo  text-slate-50 ${
              isTracking ? "bg-slate-400" : "bg-indigo-700"
            } `}
            type="submit"
          >
            {isTracking ? "Lançando horas..." : "Lançar horas"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
