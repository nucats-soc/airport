type CancelReset = () => void;

interface CopyWithFeedbackOptions {
	text: string;
	writeText: (text: string) => Promise<void>;
	setCopied: (copied: boolean) => void;
	scheduleReset: (reset: () => void, delay: number) => CancelReset;
}

export async function copyWithFeedback({
	text,
	writeText,
	setCopied,
	scheduleReset
}: CopyWithFeedbackOptions): Promise<CancelReset> {
	await writeText(text);
	setCopied(true);

	return scheduleReset(() => setCopied(false), 1500);
}
