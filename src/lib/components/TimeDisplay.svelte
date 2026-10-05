<script lang="ts">
	import {
		formatDate,
		formatDateTime,
		formatIsoDate,
		formatLongDate,
		formatMonth,
		formatMonthName,
		formatShortMonth,
		formatTime
	} from '#lib/util/dateTime.js';

    type TimeFormat =
        | 'date'
        | 'time'
        | 'dateTime'
        | 'longDate'
        | 'month'
        | 'monthName'
        | 'shortMonth';

	type Props = {
		date: Date;
		format?: TimeFormat | ((date: Date) => string);
		extraClass?: string;
	}

	const formatters: Record<TimeFormat, (date: Date) => string> = {
		date: formatDate,
		time: formatTime,
		dateTime: formatDateTime,
		longDate: formatLongDate,
		month: formatMonth,
		monthName: formatMonthName,
		shortMonth: formatShortMonth
	};

	let { date, format = 'dateTime', extraClass }: Props = $props();

	let formattedDate = $derived(
		typeof format === 'function' ? format(date) : formatters[format](date)
	);
	let machineDate = $derived.by(() => {
		if (format === 'date' || format === 'longDate') return formatIsoDate(date);
		if (format === 'month' || format === 'monthName' || format === 'shortMonth') {
			return formatIsoDate(date).slice(0, 7);
		}
		return date.toISOString();
	});
</script>

<time class={extraClass} datetime={machineDate}>{formattedDate}</time>
