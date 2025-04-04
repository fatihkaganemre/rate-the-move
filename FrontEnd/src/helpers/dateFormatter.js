export function formatDate(isoString, locale = "en-GB") {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}