import ValidatableForm, { ReportValidity } from "../../../ValidatableForm";

export default function RegistrationForm({ reportValidity }: { reportValidity: ReportValidity }) {
    return (
        <ValidatableForm
            fields={[
                { placeholder: "Username", type: "text", required: true, name: "username" },
                { placeholder: "Password", type: "password", required: true, name: "password" },
                { placeholder: "Display Name", type: "text", required: true, name: "displayName" },
                { placeholder: "Email", type: "email", required: true, name: "email" },
            ]}
            reportValidity={reportValidity}
        />
    );
}
