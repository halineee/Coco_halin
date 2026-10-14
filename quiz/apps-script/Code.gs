/**
 * Quiz du mariage Corentin & Halin : enregistrement des scores.
 *
 * À coller dans Google Sheets → Extensions → Apps Script (voir quiz/SETUP.md).
 *
 *  - doPost : reçoit une réponse du quiz et l'ajoute en une ligne dans la feuille.
 *  - doGet  : renvoie le classement (JSON) pour la page des résultats.
 *
 * Classement : plus de bonnes réponses d'abord, puis le temps le plus court.
 * Un même téléphone ne compte qu'une fois (seule sa première réponse est gardée).
 */

const SHEET_NAME = 'Quiz';
const HEADERS = ['Horodatage', 'Nom', 'Bonnes réponses', 'Total', 'Temps (s)', 'Appareil', 'Réponses'];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const name = String(data.name || '').trim().slice(0, 60);
    if (!name) return json_({ ok: false, error: 'missing-name' });

    const sheet = getSheet_();
    const deviceId = String(data.deviceId || '');

    // Déjà répondu depuis ce téléphone ? On ne crée pas de doublon.
    if (deviceId && sheet.getLastRow() > 1) {
      const devices = sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues();
      if (devices.some(function (r) { return r[0] === deviceId; })) {
        return json_({ ok: true, duplicate: true });
      }
    }

    sheet.appendRow([
      new Date(),
      name,
      Number(data.score) || 0,
      Number(data.total) || 0,
      Number(data.seconds) || 0,
      deviceId,
      JSON.stringify(data.answers || []),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return json_({ ok: true, rows: [] });

  const values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  const seen = {};
  const rows = [];
  values.forEach(function (r) {
    const name = String(r[1] || '').trim();
    if (!name) return;
    // Lignes ajoutées à la main sans « Appareil » : toujours prises en compte.
    const device = String(r[5] || '');
    if (device) {
      if (seen[device]) return;
      seen[device] = true;
    }
    rows.push({
      name: name,
      score: Number(r[2]) || 0,
      total: Number(r[3]) || 0,
      seconds: Number(r[4]) || 0,
      time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
    });
  });

  rows.sort(function (a, b) {
    return b.score - a.score || a.seconds - b.seconds;
  });
  return json_({ ok: true, rows: rows });
}
