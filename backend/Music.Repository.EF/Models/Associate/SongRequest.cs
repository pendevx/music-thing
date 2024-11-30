using System.ComponentModel.DataAnnotations.Schema;

namespace Music.Repository.EF.Models.Generated;

public partial class SongRequest
{
    [NotMapped]
    public RequestStatus RequestStatusEnum
    {
        get => Enum.Parse<RequestStatus>(RequestStatus);
        set => RequestStatus = value.ToString();
    }
}

public enum RequestStatus
{
    Pending,
    Approved,
    Rejected
}
