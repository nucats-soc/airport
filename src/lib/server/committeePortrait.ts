import { createHash } from 'node:crypto';
import type { CommitteeMember } from '$lib/types/committeeMember';

type CommitteePortrait = Pick<CommitteeMember, 'id' | 'imageUrl'>;

export function committeePortraitPath(member: CommitteePortrait): string | undefined {
	if (!member.imageUrl) {
		return undefined;
	}

	const sourceUrl = URL.parse(member.imageUrl);

	if (!sourceUrl) {
		return undefined;
	}

	const version = createHash('sha256')
		.update(`${sourceUrl.origin}${sourceUrl.pathname}`)
		.digest('hex')
		.slice(0, 12);

	return `/committee/portraits/${encodeURIComponent(member.id)}?v=${version}`;
}
