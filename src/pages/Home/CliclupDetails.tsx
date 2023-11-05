import { FormEvent, useEffect, useState, InputHTMLAttributes } from "react";
import { toast } from "react-toastify";

type FormTrack = Record<
  "team_id" | "user_id" | "token",
  InputHTMLAttributes<InputEvent>
>;

function ClickupDetails() {
  const [defaultTeamId, setDefaultTeamId] = useState<string>("");
  const [defaultUserId, setDefaultUserId] = useState<string>("");
  const [defaultToken, setDefaultToken] = useState<string>("");

  useEffect(() => {
    const teamId = localStorage.getItem("clickup-team-id");
    const userId = localStorage.getItem("clickup-user-id");
    const token = localStorage.getItem("clickup-token");
    setDefaultTeamId(teamId || "");
    setDefaultUserId(userId || "");
    setDefaultToken(token || "");
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { team_id, user_id, token } = (
      e.target as unknown as { elements: FormTrack }
    ).elements;

    localStorage.setItem("clickup-team-id", String(team_id.value || ""));
    localStorage.setItem("clickup-user-id", String(user_id.value || ""));
    localStorage.setItem("clickup-token", String(token.value || ""));

    toast.success("Credenciais salvas com sucesso!", {
      draggable: false,
      hideProgressBar: true,
      theme: "colored",
    });
    e.preventDefault();
  };

  return (
    <ul className="flex flex-col gap-4">
      <li className="flex items-center gap-4">
        <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold capitalize">
          User ID:
        </p>
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-500">
          {defaultUserId || "Sem dados para mostrar"}
        </p>
      </li>
      <li className="flex items-center gap-4">
        <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold capitalize">
          Team ID:
        </p>
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-500">
          {defaultTeamId || "Sem dados para mostrar"}
        </p>
      </li>
      <li className="flex items-center gap-4">
        <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold capitalize">
          Token:
        </p>
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-500">
          {defaultToken
            ? Array.from(defaultToken)
                .map((val, i) => (i > 10 ? "*" : val))
                .join("")
            : "Sem dados para mostrar"}
        </p>
      </li>
    </ul>
  );
}

export default ClickupDetails;
