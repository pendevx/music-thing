import ValidatableForm, { ReportValidity } from "../../../ValidatableForm";

export default function LoginForm({ reportValidity }: { reportValidity: ReportValidity }) {
    return (
        <ValidatableForm
            fields={[
                { placeholder: "Username", type: "text", required: true, name: "username" },
                { placeholder: "Password", type: "password", required: true, name: "password" },
            ]}
            reportValidity={reportValidity}
        />
    );
}
