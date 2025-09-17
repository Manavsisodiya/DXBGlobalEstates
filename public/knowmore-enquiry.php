<?php
// public/knowmore-enquiry.php
// Pure-PHP mail() sender (admin + user ack) for the "Know More" popup.
// Accepts JSON or x-www-form-urlencoded. Includes CORS + "ready" GET.

$ADMIN_TO   = "info@dxbglobalestates.com";
$FROM_EMAIL = "info@dxbglobalestates.com";
$FROM_NAME  = "DXB Global Estates";

// ---- CORS (dev + prod) ----
$allowed_origins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://dxbglobalestates.com',
  'https://www.dxbglobalestates.com'
];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins, true)) {
  header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
  header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// Quick readiness check in a browser:
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo json_encode(["ok"=>true, "message"=>"knowmore endpoint ready"]);
  exit;
}

// ---- must be POST beyond this point ----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(["ok"=>false, "error"=>"Method not allowed"]);
  exit;
}

// ---- read input (JSON first, then form) ----
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data) || empty($data)) {
  // Try form-encoded
  $data = $_POST;
}

function v($k,$d=''){ global $data; return isset($data[$k]) ? trim($data[$k]) : $d; }

$title       = v('title');
$firstName   = v('firstName');
$lastName    = v('lastName');
$email       = v('email');
$countryCode = v('countryCode');
$phone       = v('phone');
$lookingTo   = v('lookingTo');
$planToBuy   = v('planToBuy');
$newsOffers  = filter_var(v('newsOffers', false), FILTER_VALIDATE_BOOLEAN);
$privacy     = filter_var(v('privacyPolicy', false), FILTER_VALIDATE_BOOLEAN);
$projectName = v('projectName', 'Ajman Creek Towers');

// ---- basic validation ----
if (!$privacy) { http_response_code(400); echo json_encode(["ok"=>false,"error"=>"Privacy Policy not accepted"]); exit; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo json_encode(["ok"=>false,"error"=>"Invalid email"]); exit; }
$sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

$fullName  = trim($title . ' ' . $firstName . ' ' . $lastName);
$fullPhone = trim(($countryCode ?: '') . ' ' . ($phone ?: ''));
$timestamp = date("Y-m-d H:i:s");

// ---- admin email (plain text) ----
$adminSubject = "New Interest Registration - {$projectName}";
$adminBodyTxt = "New enquiry received\n\n"
  . "Project/Page: {$projectName}\n"
  . "Name: {$fullName}\n"
  . "Email: {$sanitizedEmail}\n"
  . "Phone: {$fullPhone}\n"
  . "Looking to: " . ($lookingTo ?: 'Not specified') . "\n"
  . "Plan to buy: " . ($planToBuy ?: 'Not specified') . "\n"
  . "News/Offers: " . ($newsOffers ? 'Yes' : 'No') . "\n"
  . "Privacy Policy: " . ($privacy ? 'Accepted' : 'Not accepted') . "\n"
  . "Timestamp: {$timestamp}\n";

// show user as sender (many servers/WAFs dislike spoofing; if fail, switch to domain From below)
$headersAdmin = [
  "From: " . (($fullName ? "{$fullName} <{$sanitizedEmail}>" : $sanitizedEmail)),
  "Reply-To: {$sanitizedEmail}",
  "MIME-Version: 1.0",
  "Content-Type: text/plain; charset=UTF-8"
];
$headersAdminStr = implode("\r\n", $headersAdmin);

// ---- user ack (HTML) ----
$userSubject = "Thanks for your interest in {$projectName}";
$safeFirst   = $firstName ?: $fullName ?: 'there';
$userBodyHtml = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#111;">'
  . "<p>Hi " . htmlspecialchars($safeFirst) . ",</p>"
  . "<p>Thank you for registering your interest in <strong>" . htmlspecialchars($projectName) . "</strong> with <strong>DXB Global Estates</strong>.</p>"
  . "<p>Our team has received your enquiry and will get back to you within <strong>24–48 hours</strong>.</p>"
  . '<hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />'
  . "<p><strong>Helpful links</strong></p>"
  . '<ul>'
  . '<li>Project page: <a href="https://dxbglobalestates.com/ajman" target="_blank" rel="noopener">Ajman Creek Towers</a></li>'
  . '<li>Website: <a href="https://dxbglobalestates.com" target="_blank" rel="noopener">dxbglobalestates.com</a></li>'
  . '</ul>'
  . "<p>If you have any immediate questions, simply reply to this email or call us at <strong>+971-xxx-xxx-xxxx</strong>.</p>"
  . "<p>Warm regards,<br/>DXB Global Estates</p>"
  . '<p style="font-size:12px;color:#666;margin-top:16px;">This acknowledgement is sent automatically. Our working hours are 9:00–18:00 GST, Sunday–Thursday.</p>'
  . '</div>';

$headersUser = [
  "From: {$FROM_NAME} <{$FROM_EMAIL}>",
  "Reply-To: {$FROM_EMAIL}",
  "MIME-Version: 1.0",
  "Content-Type: text/html; charset=UTF-8"
];
$headersUserStr = implode("\r\n", $headersUser);

// use envelope sender for SPF alignment (some hosts require -f)
$envelope = "-f{$FROM_EMAIL}";

$adminOk = @mail($ADMIN_TO, $adminSubject, $adminBodyTxt, $headersAdminStr, $envelope);
$userOk  = @mail($sanitizedEmail, $userSubject, $userBodyHtml, $headersUserStr, $envelope);

if ($adminOk) {
  echo json_encode(["ok"=>true, "admin"=>$adminOk, "user"=>$userOk]);
} else {
  http_response_code(500);
  echo json_encode(["ok"=>false, "error"=>"Failed to send admin email", "admin"=>$adminOk, "user"=>$userOk]);
}
