// DompetKu - Google Apps Script
// Paste seluruh kode ini ke Apps Script, lalu Deploy

const SHEET_NAME_TX = "Transaksi";
const SHEET_NAME_INV = "Investasi";
const SHEET_NAME_INVTX = "Setoran Investasi";

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const params = e.parameter;
  const action = params.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    initSheets(ss);

    if (action === "getTx") return respond(getTx(ss));
    if (action === "addTx") return respond(addTx(ss, params));
    if (action === "deleteTx") return respond(deleteTx(ss, params));

    if (action === "getInv") return respond(getInv(ss));
    if (action === "addInv") return respond(addInv(ss, params));
    if (action === "deleteInv") return respond(deleteInv(ss, params));
    if (action === "updateInvBalance") return respond(updateInvBalance(ss, params));

    if (action === "getInvTx") return respond(getInvTx(ss));
    if (action === "addInvTx") return respond(addInvTx(ss, params));

    if (action === "getAll") return respond(getAll(ss));

    return respond({ ok: false, error: "Action tidak dikenal" });
  } catch (err) {
    return respond({ ok: false, error: err.toString() });
  }
}

function respond(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ============ INIT SHEETS ============
function initSheets(ss) {
  ensureSheet(ss, SHEET_NAME_TX,
    ["ID", "Tanggal", "Jenis", "Kategori", "Keterangan", "Mata Uang", "Jumlah", "Jumlah (IDR)", "Catatan"]);
  ensureSheet(ss, SHEET_NAME_INV,
    ["ID", "Nama", "Jenis", "Saldo"]);
  ensureSheet(ss, SHEET_NAME_INVTX,
    ["ID", "Tanggal", "ID Investasi", "Nama Investasi", "Jumlah", "Catatan"]);
}

function ensureSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ============ TRANSAKSI ============
function getTx(ss) {
  const sheet = ss.getSheetByName(SHEET_NAME_TX);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { ok: true, data: [] };
  const rows = data.slice(1).map(r => ({
    id: r[0], date: r[1], type: r[2], cat: r[3],
    desc: r[4], currency: r[5], amount: r[6], amtIDR: r[7], note: r[8]
  })).reverse();
  return { ok: true, data: rows };
}

function addTx(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_TX);
  const id = Date.now().toString();
  sheet.appendRow([
    id, p.date, p.type, p.cat || "",
    p.desc, p.currency, parseFloat(p.amount),
    parseFloat(p.amtIDR), p.note || ""
  ]);
  return { ok: true, id };
}

function deleteTx(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_TX);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString() === p.id.toString()) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, error: "Data tidak ditemukan" };
}

// ============ INVESTASI ============
function getInv(ss) {
  const sheet = ss.getSheetByName(SHEET_NAME_INV);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { ok: true, data: [] };
  const rows = data.slice(1).map(r => ({
    id: r[0], name: r[1], type: r[2], balance: r[3]
  }));
  return { ok: true, data: rows };
}

function addInv(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_INV);
  const id = Date.now().toString();
  sheet.appendRow([id, p.name, p.type, parseFloat(p.balance) || 0]);
  return { ok: true, id };
}

function deleteInv(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_INV);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString() === p.id.toString()) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, error: "Data tidak ditemukan" };
}

function updateInvBalance(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_INV);
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString() === p.id.toString()) {
      sheet.getRange(i + 1, 4).setValue(parseFloat(p.balance));
      return { ok: true };
    }
  }
  return { ok: false, error: "Data tidak ditemukan" };
}

// ============ SETORAN INVESTASI ============
function getInvTx(ss) {
  const sheet = ss.getSheetByName(SHEET_NAME_INVTX);
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { ok: true, data: [] };
  const rows = data.slice(1).map(r => ({
    id: r[0], date: r[1], invId: r[2], invName: r[3],
    amt: r[4], note: r[5]
  })).reverse();
  return { ok: true, data: rows };
}

function addInvTx(ss, p) {
  const sheet = ss.getSheetByName(SHEET_NAME_INVTX);
  const id = Date.now().toString();
  sheet.appendRow([id, p.date, p.invId, p.invName, parseFloat(p.amt), p.note || ""]);

  // update saldo investasi
  updateInvBalance(ss, { id: p.invId, balance: parseFloat(p.newBalance) });
  return { ok: true, id };
}

// ============ GET ALL (load pertama kali) ============
function getAll(ss) {
  return {
    ok: true,
    transactions: getTx(ss).data,
    investments: getInv(ss).data,
    investTxs: getInvTx(ss).data
  };
}
