import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "@components/Fields/Input";
import { FormClickup, clickupFormValidation } from "./zod.validation";

function ClickupForm() {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormClickup>({
    resolver: zodResolver(clickupFormValidation),
  });

  useEffect(() => {
    const teamId = localStorage.getItem("clickup-team-id");
    const userId = localStorage.getItem("clickup-user-id");
    const token = localStorage.getItem("clickup-token");
    resetField("team_id", { defaultValue: teamId || "" });
    resetField("user_id", { defaultValue: userId || "" });
    resetField("token", { defaultValue: token || "" });
  }, [resetField]);

  const onSubmit = handleSubmit(({ team_id, user_id, token }) => {
    localStorage.setItem("clickup-team-id", String(team_id));
    localStorage.setItem("clickup-user-id", String(user_id));
    localStorage.setItem("clickup-token", String(token));

    toast.success("Credenciais salvas com sucesso!", {
      draggable: false,
      hideProgressBar: true,
      theme: "colored",
    });
  });

  return (
    <div className="isolate">
      <form className="mx-auto mt-6 max-w-xl" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mb-5">
            <label
              htmlFor="teamId"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Team ID
            </label>
            <div className="mt-2.5">
              <Input
                status={errors.team_id?.message ? "error" : undefined}
                id="teamId"
                type="text"
                {...register("team_id")}
              />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="userId"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              User ID
            </label>
            <div className="mt-2.5">
              <Input
                status={errors.user_id?.message ? "error" : undefined}
                id="userId"
                type="text"
                {...register("user_id")}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="token"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Token
          </label>
          <div className="mt-2.5">
            <Input
              status={errors.token?.message ? "error" : undefined}
              id="token"
              type="text"
              {...register("token")}
            />
          </div>
        </div>
        <div className="mt-5">
          <button
            className="h-10 px-6 font-semibold rounded-md border bo  text-slate-50 bg-indigo-700"
            type="submit"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClickupForm;
