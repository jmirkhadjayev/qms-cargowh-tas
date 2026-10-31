package uz.airport.cargo.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import uz.airport.cargo.model.Ticket;
import uz.airport.cargo.repository.TicketRepository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportService {

    private final TicketRepository ticketRepository;

    public ReportService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public byte[] generateExcelShiftReport(LocalDateTime start, LocalDateTime end) throws IOException {
        List<Ticket> tickets = ticketRepository.findByPeriod(start, end);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Smena Hisoboti");

            // Styles
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            CellStyle dateStyle = workbook.createCellStyle();
            DataFormat format = workbook.createDataFormat();
            dateStyle.setDataFormat(format.getFormat("yyyy-mm-dd hh:mm:ss"));

            // Title Row
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("TOSHKENT XALQARO AEROPORTI - YUK TERMINALI (TAS CARGO)");
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 14);
            CellStyle titleStyle = workbook.createCellStyle();
            titleStyle.setFont(titleFont);
            titleCell.setCellStyle(titleStyle);

            Row subRow = sheet.createRow(1);
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");
            subRow.createCell(0).setCellValue("Davr: " + start.format(dtf) + " dan " + end.format(dtf) + " gacha | Jami arizalar: " + tickets.size());

            // Header Row
            String[] headers = {
                    "Talon #", "AWB Raqami", "Yuk egasi (Consignee)", "Kategoriya",
                    "Jami joy", "Berilgan joy", "Vazn (kg)", "Avto raqami", "Dok #",
                    "Status", "Ro'yxat vaqti", "Dokga chaqiruv", "KPP Chiqish", "Kutish (daqiqa)"
            };

            Row headerRow = sheet.createRow(3);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // Data Rows
            int rowIdx = 4;
            for (Ticket t : tickets) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(t.getTicketNumber());
                row.createCell(1).setCellValue(t.getAwbNumber());
                row.createCell(2).setCellValue(t.getConsigneeName());
                row.createCell(3).setCellValue(t.getCategory().getDisplayName());
                row.createCell(4).setCellValue(t.getTotalPieces());
                row.createCell(5).setCellValue(t.getIssuedPieces() != null ? t.getIssuedPieces() : 0);
                row.createCell(6).setCellValue(t.getTotalWeightKg());
                row.createCell(7).setCellValue(t.getVehiclePlate() != null ? t.getVehiclePlate() : "-");
                row.createCell(8).setCellValue(t.getAssignedDockNumber() != null ? "Dock " + t.getAssignedDockNumber() : "-");
                row.createCell(9).setCellValue(t.getStatus().getUzbekName());
                row.createCell(10).setCellValue(t.getRegisteredAt().format(dtf));
                row.createCell(11).setCellValue(t.getFirstCalledAt() != null ? t.getFirstCalledAt().format(dtf) : "-");
                row.createCell(12).setCellValue(t.getClosedAt() != null ? t.getClosedAt().format(dtf) : "-");

                long waitMins = 0;
                if (t.getFirstCalledAt() != null) {
                    waitMins = Duration.between(t.getRegisteredAt(), t.getFirstCalledAt()).toMinutes();
                }
                row.createCell(13).setCellValue(waitMins);
            }

            // Auto-size columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            return baos.toByteArray();
        }
    }
}
