import { writable, get } from 'svelte/store';
import { derived } from 'svelte/store';
import en from './locales/en.json';
import sq from './locales/sq.json';
import de from './locales/de.json';
import pl from './locales/pl.json';

const resources = { en, sq, de, pl };

// Persist choice in localStorage when available (SSR-safe)
const initial = (typeof window !== 'undefined' && window.localStorage && window.localStorage.getItem('locale')) || 'en';
export const locale = writable(initial);
locale.subscribe((val) => {
	if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem('locale', val);
});

export const availableLocales = [
	{ code: 'en', label: 'English' },
	{ code: 'sq', label: 'Shqip' },
	{ code: 'de', label: 'Deutsch' },
	{ code: 'pl', label: 'Polski' }
];

// derived store that exposes the current translations object and is reactive
export const translations = derived(locale, ($locale) => {
	return resources[$locale] || resources['en'];
});

let wuchaleClient = null;

// Use a runtime dynamic import that bypasses Vite's static import analysis.
(async () => {
	try {
		// create a non-analyzable dynamic import
		const dynImport = new Function('s', 'return import(s)');
		const mod = await dynImport('wuchale');
		wuchaleClient = mod && (mod.default || mod);

		if (wuchaleClient && typeof wuchaleClient.init === 'function') {
			// best-effort: let wuchale initialize if it exposes init
			try { wuchaleClient.init({ resources, defaultLocale: 'en' }); } catch (e) {}
		}
	} catch (e) {
		// wuchale not installed or failed to load — fall back to local resources silently
	}
})();

export function t(key, vars = {}) {
 	const cur = get(locale) || 'en';

 	// If wuchale provides t, prefer it 
 	if (wuchaleClient && typeof wuchaleClient.t === 'function') {
 		try { return wuchaleClient.t(cur, key, vars); } catch (e) { /* continue to local */ }
 	}

 	const val = (resources[cur] && resources[cur][key]) || (resources['en'] && resources['en'][key]) || key;

 	// basic variable replacement: {name}
 	return String(val).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
}

export function setLocale(l) {
 	if (!resources[l]) return;
 	locale.set(l);
}
